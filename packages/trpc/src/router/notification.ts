import { z } from 'zod';

import { prisma } from '../common/db';
import { router, protectedProcedure } from '../trpc-server';

export const notificationRouter = router({
  messages: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const messages = await prisma.notificationMessage.findMany({
        where: {
          recipientId: input.userId,
        },
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
  readAMessage: protectedProcedure
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
  deleteAMessage: protectedProcedure
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
  registerSubscriptionDevice: protectedProcedure
    .input(
      z.object({
        subscription: z.object({
          endpoint: z.string().url(),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await prisma.notificationSubscription.create({
        data: {
          subscription: input.subscription,
          userId: ctx.session.user.id,
        },
        select: {
          id: true,
        },
      });
    }),
});
