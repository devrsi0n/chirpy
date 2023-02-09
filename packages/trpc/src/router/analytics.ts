import { isENVDev, queryUsage } from '@chirpy-dev/utils';

import { BlogSite, DocsSite, prisma } from '../db';
import { protectedProcedure, router } from '../trpc-server';

export const analyticsRouter = router({
  usage: protectedProcedure.query(async ({ ctx }) => {
    const selectDomains = {
      select: {
        subdomain: true,
        customDomain: true,
      },
    };
    const user = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        managedBlogSites: selectDomains,
        managedDocsSites: selectDomains,
        billingCycleStart: true,
        plan: {
          select: {
            pv: true,
          },
        },
      },
    });
    if (!user) {
      return 0;
    }

    const usage = await getAllSitesUsage(
      user.managedBlogSites,
      user.managedDocsSites,
      user.billingCycleStart,
    );
    return { usage, usageLimit: user.plan?.pv || 1000 };
  }),
});

export async function getAllSitesUsage(
  blogSites: Pick<BlogSite, 'subdomain' | 'customDomain'>[],
  docsSites: Pick<DocsSite, 'subdomain' | 'customDomain'>[],
  billingCycleStart: number | null,
) {
  const domains = [...blogSites, ...docsSites].map((site) =>
    isENVDev
      ? `http://${site.subdomain}.localhost:3000`
      : `https://${site.customDomain}`,
  );
  if (domains.length === 0) return 0;

  const pageviews = await queryUsage({
    domains: domains,
    billingCycleStart,
  });
  return pageviews;
}
