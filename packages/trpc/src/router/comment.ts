import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '../common/db';
import { router, publicProcedure, protectedProcedure } from '../trpc-server';
import { rteContentValidator } from './validator';

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
  create: protectedProcedure
    .input(
      z.object({
        content: rteContentValidator,
        pageId: z.string(),
        parentId: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const data = await prisma.comment.create({
        data: {
          content: input.content,
          pageId: input.pageId,
          parentId: input.parentId,
          userId: ctx.session.user.id,
        },
      });

      return data;
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const comments = await prisma.comment.findMany({
        where: {
          id: input,
          page: {
            project: {
              id: {
                // Only site owner can delete comments, currently
                in: ctx.session.user.editableProjectIds,
              },
            },
          },
        },
        select: {
          id: true,
          content: true,
          userId: true,
          parentId: true,
        },
      });
      if (comments.length === 0) {
        // Stop malicious user from deleting other users comments
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      // Soft delete
      await prisma.comment.update({
        where: {
          id: input,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return comments[0];
    }),
});
