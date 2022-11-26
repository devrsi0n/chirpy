import { z } from 'zod';

import { prisma } from '../common/db';
import { router, protectedProcedure } from '../trpc-server';

export const commentRouter = router({
  forest: protectedProcedure
    .input(z.object({ url: z.string() }))
    .query(async ({ input }) => {
      const result = await prisma.comment.findMany({
        where: {
          page: {
            url: input.url,
          },
          parentId: null,
        },
        include: {
          user: true,
          likes: true,
          replies: {
            include: {
              user: true,
              likes: true,
              replies: {
                include: {
                  user: true,
                  likes: true,
                  replies: {
                    include: {
                      user: true,
                      replies: true,
                      likes: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      return result;
    }),
});
