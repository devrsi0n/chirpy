import { z } from 'zod';

import { prisma } from '../common/db';
import { router, publicProcedure } from '../trpc-server';

export const commentRouter = router({
  forest: publicProcedure
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
  timeline: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await prisma.comment.findUnique({
        where: {
          id: input.id,
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
          parent: {
            include: {
              user: true,
              likes: true,
              parent: {
                include: {
                  user: true,
                  likes: true,
                  parent: {
                    include: {
                      user: true,
                      parent: true,
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
