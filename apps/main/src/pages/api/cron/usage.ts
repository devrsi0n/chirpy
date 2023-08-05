import { prisma, stripe } from '@chirpy-dev/trpc';
import { cpDayjs, queryDailyPVUsage } from '@chirpy-dev/utils';
import { verifySignature } from '@upstash/qstash/nextjs';
import { log as axiomLog } from 'next-axiom';

const log = axiomLog.with({
  scope: 'cron-usage',
});

// This cron task runs on everyday
async function updateUsage() {
  const users = await prisma.user.findMany({
    where: {
      plan: {
        in: ['PRO', 'ENTERPRISE'],
      },
      stripeSubscriptionId: {
        not: null,
      },
    },
    select: {
      stripeSubscriptionId: true,
      projects: {
        select: {
          domain: true,
        },
      },
    },
  });
  const updateUserUsage = async (user: (typeof users)[number]) => {
    const pv = await queryDailyPVUsage({
      domains: user.projects.map((p) => p.domain),
    });
    // To avoid duplicated reports
    const idempotencyKey = `${user.stripeSubscriptionId}_${cpDayjs()
      .utc()
      .format('YYYY-MM-DD')}`;
    try {
      await stripe.subscriptionItems.createUsageRecord(
        user.stripeSubscriptionId!,
        {
          quantity: pv,
          action: 'increment',
        },
        {
          idempotencyKey,
        },
      );
    } catch (error) {
      log.error(
        `Usage report failed for item ID ${
          user.stripeSubscriptionId
        } with idempotency key ${idempotencyKey}: ${(
          error as Error
        ).toString()}`,
      );
    }
  };
  await Promise.allSettled(users.map((u) => updateUserUsage(u)));
  await log.flush();
}

const cron = () => {
  if (process.env.NODE_ENV === 'development') {
    return updateUsage;
  }
  return verifySignature(updateUsage);
};

export default cron();

export const config = {
  api: {
    bodyParser: false,
  },
};
