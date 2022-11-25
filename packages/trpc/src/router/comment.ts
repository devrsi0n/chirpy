import { z } from 'zod';

import { prisma } from '../common/db';
import { router, protectedProcedure } from '../trpc-server';

export const commentRouter = router({
  deleteStaleComments: protectedProcedure
    .input(z.object({ beforeDate: z.string(), url: z.string() }))
    .mutation(async ({ input }) => {
      const result = await prisma.comment.deleteMany({
        where: {
          createdAt: {
            lt: input.beforeDate,
          },
          page: {
            url: input.url,
          },
        },
      });
      return result;
    }),
});
