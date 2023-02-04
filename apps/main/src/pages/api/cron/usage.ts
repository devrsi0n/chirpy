import { BlogSite, DocsSite, prisma } from '@chirpy-dev/trpc';
import { isENVDev, queryUsage } from '@chirpy-dev/utils';
import { verifySignature } from '@upstash/qstash/nextjs';

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
      );
      if (usage >= 0.8 * (user.plan?.pv || 0)) {
        // Send email
        return;
      }
    }),
  );
}

async function getAllSitesUsage(blogSites: BlogSite[], docsSites: DocsSite[]) {
  const domains = [...blogSites, ...docsSites].map(
    (site) => `https://${site.customDomain || site.subdomain + '.chirpy.dev'}`,
  );
  if (domains.length === 0) return 0;
  const usage = await queryUsage({
    domains: domains.join(','),
    date_from: '2023-01-01',
    date_to: new Date().toISOString(),
  });
  return usage.data.reduce((acc, { pageviews }) => {
    acc += pageviews;
    return acc;
  }, 0);
}

/**
 * verifySignature will try to load `QSTASH_CURRENT_SIGNING_KEY` and `QSTASH_NEXT_SIGNING_KEY` from the environment.
 */
export default function handler() {
  if (isENVDev) {
    return updateUsage();
  }
  return verifySignature(updateUsage);
}
