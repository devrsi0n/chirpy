import { z } from 'zod';

import { prisma } from '../common/db-client';
import { router, protectedProcedure } from '../trpc-server';

export const likeRouter = router({
  create: protectedProcedure
    .input(z.object({ commentId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const result = await prisma.like.create({
        data: {
          commentId: input.commentId,
          userId: ctx.session.user.id,
        },
      });
      return result;
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const result = await prisma.like.deleteMany({
        where: {
          id: input,
          userId: ctx.session.user.id,
        },
      });
      return result;
    }),
});
