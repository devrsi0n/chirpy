import { BlogSite, DocsSite, prisma } from '@chirpy-dev/trpc';
import { cpDayjs } from '@chirpy-dev/ui';
import { dateFormat, isENVDev, queryUsage } from '@chirpy-dev/utils';
import { verifySignature } from '@upstash/qstash/nextjs';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { log } from 'next-axiom';

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
    },
    include: {
      managedBlogSites: true,
      managedDocsSites: true,
      plan: true,
    },
  });
  await Promise.all(
    users.map(async (user) => {
      const usage = await getAllSitesUsage(
        user.managedBlogSites,
        user.managedDocsSites,
        user.billingCycleStart,
      );
      if (usage >= 0.8 * (user.plan?.pv || 1000)) {
        // Send email
        log.debug(`Notify user for the usage`);
        return;
      } else if (usage > (user.plan?.pv || 1000)) {
        // Send email
        return;
      }
      log.debug(`Usage`, { usage });
    }),
  );
}

async function getAllSitesUsage(
  blogSites: BlogSite[],
  docsSites: DocsSite[],
  billingCycleStart: number | null,
) {
  const domains = [...blogSites, ...docsSites].map(
    (site) => `https://${site.customDomain || site.subdomain + '.chirpy.dev'}`,
  );
  if (domains.length === 0) return 0;
  const dateFrom = cpDayjs();
  dateFrom.date(billingCycleStart || 1);
  const usage = await queryUsage({
    domains: domains.join(','),
    date_from: dateFrom.format(dateFormat),
    date_to: cpDayjs().format(dateFormat),
  });
  return usage.data.reduce((acc, { pageviews }) => {
    acc += pageviews;
    return acc;
  }, 0);
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
