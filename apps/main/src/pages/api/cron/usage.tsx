import { getAllSitesUsage, prisma } from '@chirpy-dev/trpc';
import { cpDayjs, isENVDev } from '@chirpy-dev/utils';
import { verifySignature } from '@upstash/qstash/nextjs';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { log } from 'next-axiom';

import { sendUsageExceedEmail } from '../../../../emails';

async function updateUsage() {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          // Filter users with none empty sites
          NOT: {
            managedBlogSites: {
              none: {},
            },
          },
        },
        {
          NOT: {
            managedDocsSites: {
              none: {},
            },
          },
        },
      ],
      NOT: {
        email: null,
      },
    },
    include: {
      managedBlogSites: true,
      managedDocsSites: true,
      plan: true,
      sentEmails: true,
    },
  });
  await Promise.all(
    users.map(async (user) => {
      if (!user.email) return;
      const usage = await getAllSitesUsage(
        user.managedBlogSites,
        user.managedDocsSites,
        user.billingCycleStart,
      );
      const usageLimit = user.plan?.pv || 1000;
      log.debug(`[Cron Usage]`, { usage, usageLimit: user.plan?.pv });
      const lastSentEmail = user.sentEmails.find(
        (e) => e.type === 'USAGE_EXCEEDED',
      );
      const today = cpDayjs();
      if (
        usage >= usageLimit &&
        (!lastSentEmail ||
          today.diff(lastSentEmail.updatedAt, 'day', true) >
            Math.min(1.5 * lastSentEmail.count, 10))
      ) {
        log.debug(`Notify user for the usage exceeded`);
        await Promise.all([
          sendUsageExceedEmail({
            to: user.email,
            userName: user.name || user.username,
            usage,
            usageLimit,
            plan: user.plan?.type || 'FREE',
          }),
          prisma.sentEmail.upsert({
            where: {
              type_userId: {
                type: 'USAGE_EXCEEDED',
                userId: user.id,
              },
            },
            update: {
              count: {
                increment: 1,
              },
            },
            create: {
              userId: user.id,
              type: 'USAGE_EXCEEDED',
            },
          }),
        ]);
      }
    }),
  );
}

/**
 * verifySignature will try to load `QSTASH_CURRENT_SIGNING_KEY` and `QSTASH_NEXT_SIGNING_KEY` from the environment.
 */
const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (isENVDev) {
    await updateUsage();
    return res.status(200).json({ message: 'ok' });
  }
  return verifySignature(updateUsage)(req, res);
};
export default handler;
