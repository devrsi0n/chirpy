import { z } from 'zod';

import { prisma } from '../common/db-client';
import { revalidateCommentWidgets } from '../common/revalidate';
import { protectedProcedure, router } from '../trpc-server';

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
  url: protectedProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.res.revalidate(input.url);
    }),
});
