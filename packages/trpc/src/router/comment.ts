import { JSONContent } from '@chirpy-dev/utils';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '../common/db-client';
import { protectedProcedure, publicProcedure, router } from '../trpc-server';
import { COMMON_COMMENT_SELECTOR } from './utils/selector';

/**
 * type of
 * ```ts
 * export declare type JSONContent = {
 *  type?: string;
 *   attrs?: Record<string, any>;
 *   content?: JSONContent[];
 *   marks?: {
 *       type: string;
 *       attrs?: Record<string, any>;
 *       [key: string]: any;
 *   }[];
 *   text?: string;
 *   [key: string]: any;
 * };
 * ```
 */
export const RTE_CONTENT_INPUT: z.ZodType<JSONContent> = z.lazy(
  () =>
    z
      .object({
        type: z.string().optional(),
        attrs: z.record(z.any()).optional(),
        content: z.array(RTE_CONTENT_INPUT).optional(),
        marks: z
          .array(
            z.object({
              type: z.string(),
              attrs: z.record(z.any()).optional(),
            }),
          )
          .optional(),
        text: z.string().optional(),
      })
      .passthrough(), // Only check a sub set of fields, don't strip unknown fields
);

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
        content: RTE_CONTENT_INPUT,
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
