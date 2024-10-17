import { prisma, stripe } from '@chirpy-dev/trpc';
import { cpDayjs, queryDailyPVUsage } from '@chirpy-dev/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { log as axiomLog } from 'next-axiom';

const log = axiomLog.with({
  scope: 'cron-usage',
});

// This cron task runs on everyday
export default async function updateUsage(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const authHeader = req.headers.authorization;
  if (
    !process.env.CRON_SECRET ||
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return res.status(401).json({ success: false });
  }

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
      const msg = `Usage report failed for item ID ${
        user.stripeSubscriptionId
      } with idempotency key ${idempotencyKey}: ${(error as Error).toString()}`;
      log.error(msg);
      throw new Error(msg);
    }
  };
  try {
    await Promise.allSettled(users.map((u) => updateUserUsage(u)));
  } catch {
    res.status(500).end('Create usage record failed');
  }
  await log.flush();
  res.status(200).end('ok');
}

export const config = {
  api: {
    bodyParser: false,
  },
};
