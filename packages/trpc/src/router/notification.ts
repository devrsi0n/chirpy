import { Prisma } from '@prisma/client';
import { log } from 'next-axiom';
import { z } from 'zod';

import { prisma } from '../common/db-client';
import { handleCommentEvent } from '../mutation-event/comment-handler';
import { handleLikeEvent } from '../mutation-event/like-handler';
import { protectedProcedure, router } from '../trpc-server';
import { RTE_CONTENT_INPUT } from './comment';

export const NOTIFICATION_SUBSCRIPTION_INPUT = z
  .object({
    endpoint: z.string().url(),
  })
  .passthrough();

export type NOTIFICATION_SUBSCRIPTION_INPUT = z.infer<
  typeof NOTIFICATION_SUBSCRIPTION_INPUT
>;

export const notificationRouter = router({
  messages: protectedProcedure.query(async ({ ctx }) => {
    const messages = await prisma.notificationMessage.findMany({
      where: {
        recipientId: ctx.session.user.id,
      },
      orderBy: [
        {
          read: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],
      select: {
        id: true,
        type: true,
        content: true,
        createdAt: true,
        read: true,
        url: true,
        triggeredBy: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
            email: true,
          },
        },
      },
    });
    return messages;
  }),
  read: protectedProcedure
    .input(z.object({ messageId: z.string() }))
    .mutation(async ({ input }) => {
      const result = await prisma.notificationMessage.update({
        where: {
          id: input.messageId,
        },
        data: {
          read: true,
        },
        select: {
          id: true,
        },
      });
      return result;
    }),
  delete: protectedProcedure
    .input(z.object({ messageId: z.string() }))
    .mutation(async ({ input }) => {
      const result = await prisma.notificationMessage.delete({
        where: {
          id: input.messageId,
        },
        select: {
          id: true,
        },
      });
      return result;
    }),
  register: protectedProcedure
    .input(
      z.object({
        subscription: NOTIFICATION_SUBSCRIPTION_INPUT,
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const result = await prisma.notificationSubscription.findFirst({
        where: {
          subscription: {
            equals: input.subscription as Prisma.JsonObject,
          },
          userId: ctx.session.user.id,
        },
      });
      if (result?.id) {
        // Ignore duplicated subscription
        log.debug('Duplicated subscription');
        return;
      }
      await prisma.notificationSubscription.create({
        data: {
          subscription: input.subscription as Prisma.JsonObject,
          userId: ctx.session.user.id,
        },
        select: {
          id: true,
        },
      });
    }),
  mutate: protectedProcedure
    .input(
      z.object({
        op: z.enum(['INSERT', 'DELETE']),
        comment: z
          .object({
            id: z.string(),
            userId: z.string(),
            parentId: z.string().nullable(),
            content: RTE_CONTENT_INPUT,
          })
          .nullish(),
        like: z
          .object({
            id: z.string(),
            commentId: z.string(),
          })
          .nullish(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (input.comment) {
        await handleCommentEvent(
          {
            op: input.op,
            comment: input.comment,
          },
          ctx.res,
          ctx.session.user.id,
        );
      } else if (input.like) {
        await handleLikeEvent(
          {
            op: input.op,
            like: {
              ...input.like,
              userId: ctx.session.user.id,
            },
          },
          ctx.res,
          ctx.session.user.id,
        );
      }
    }),
});
