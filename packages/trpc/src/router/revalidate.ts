import { z } from 'zod';

import { revalidateCommentWidgets } from '../common/revalidate';
import { prisma } from '../db/client';
import { router, protectedProcedure } from '../trpc-server';

export const revalidateRouter = router({
  widget: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const project = await prisma.project.findUnique({
        where: {
          id: input.projectId,
        },
        select: {
          pages: {
            select: {
              url: true,
            },
          },
        },
      });
      const pageURLs = project?.pages.map((p) => p.url) || [];
      await revalidateCommentWidgets(pageURLs, ctx.res);
    }),
  theme: protectedProcedure
    .input(z.object({ domain: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.res.revalidate(`/theme/${input.domain}`);
    }),
});
