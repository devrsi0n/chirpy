import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '../db/client';
import { router, publicProcedure, protectedProcedure } from '../trpc-server';
import { COMMON_COMMENT_SELECTOR } from './utils/selector';
import { rteContentValidator } from './utils/validator';

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
          ...COMMON_COMMENT_SELECTOR,
          replies: {
            include: {
              ...COMMON_COMMENT_SELECTOR,
              replies: {
                include: {
                  ...COMMON_COMMENT_SELECTOR,
                  replies: {
                    include: {
                      ...COMMON_COMMENT_SELECTOR,
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
          ...COMMON_COMMENT_SELECTOR,
          replies: {
            include: {
              ...COMMON_COMMENT_SELECTOR,
              replies: {
                include: {
                  ...COMMON_COMMENT_SELECTOR,
                  replies: {
                    include: {
                      ...COMMON_COMMENT_SELECTOR,
                    },
                  },
                },
              },
            },
          },
          parent: {
            include: {
              ...COMMON_COMMENT_SELECTOR,
              parent: {
                include: {
                  ...COMMON_COMMENT_SELECTOR,
                  parent: {
                    include: {
                      ...COMMON_COMMENT_SELECTOR,
                      parent: true,
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
      const user = await prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          projects: {
            select: {
              id: true,
            },
          },
        },
      });
      const editableProjectIds =
        user?.projects.map((project) => project.id) || [];
      const comments = await prisma.comment.findMany({
        where: {
          id: input,
          page: {
            project: {
              id: {
                // Only site owner can delete comments, currently
                in: editableProjectIds,
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
