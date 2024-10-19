import { prisma, stripe } from '@chirpy-dev/trpc';
import { cpDayjs, queryPipe, type QueryPipe } from '@chirpy-dev/utils';
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
      stripeSubscriptionItemId: {
        not: null,
      },
    },
    select: {
      stripeSubscriptionItemId: true,
      billingCycleDay: true,
      projects: {
        select: {
          domain: true,
        },
      },
    },
  });
  const updateUserUsage = async (user: (typeof users)[number]) => {
    const pv = await queryPVUsage({
      domains: user.projects.map((p) => p.domain),
      billingCycleDay: user.billingCycleDay,
    });
    // To avoid duplicated reports
    const idempotencyKey = `${user.stripeSubscriptionItemId}_${cpDayjs()
      .utc()
      .format('YYYY-MM-DD')}`;
    try {
      await stripe.subscriptionItems.createUsageRecord(
        user.stripeSubscriptionItemId!,
        {
          quantity: pv,
          action: 'set',
        },
        {
          idempotencyKey,
        },
      );
    } catch (error) {
      const msg = `Usage report failed for item ID ${
        user.stripeSubscriptionItemId
      } with idempotency key ${idempotencyKey}: ${(error as Error).toString()}`;
      log.error(msg);
      throw new Error(msg);
    }
  };
  try {
    await Promise.all(users.map((u) => updateUserUsage(u)));
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

const DATE_FORMAT = 'YYYY-MM-DD';

/**
 * Get pageviews usage
 */
export async function queryPVUsage(params: {
  domains: string[];
  billingCycleDay: number | null;
}): Promise<number> {
  const today = cpDayjs().utc();
  const billingCycleDay = params.billingCycleDay || 1;

  // For today is after billing cycle day, we query usage from this month to next month
  let from = today.date(billingCycleDay);
  let to = today.date(billingCycleDay).add(1, 'month');

  // For today is before billing cycle day, we query usage from last month to this month
  if (today.date() < billingCycleDay) {
    from = from.subtract(1, 'month');
    to = to.subtract(1, 'month');
  }
  const usage: QueryPipe<{
    pageviews: number;
    href: string;
    indices: number[];
  }> = await queryPipe('pv_by_domains', {
    date_from: from.format(DATE_FORMAT),
    date_to: to.format(DATE_FORMAT),
    domains: params.domains.join(','),
  });
  return usage.data.reduce((acc, { pageviews }) => {
    acc += pageviews;
    return acc;
  }, 0);
}
