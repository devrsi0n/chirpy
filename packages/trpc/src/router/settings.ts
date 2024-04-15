import { TRPCError } from '@trpc/server';
import { customAlphabet } from 'nanoid';
import { z } from 'zod';

import { prisma } from '../common/db-client';
import { protectedProcedure, router } from '../trpc-server';

const nanoid = customAlphabet('1234567890abcdef', 16);

export const settingsRouter = router({
  all: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const settings = await prisma.settings.upsert({
      where: {
        userId,
      },
      update: {},
      create: {
        userId,
      },
    });
    return settings;
  }),
  update: protectedProcedure
    .input(
      z.object({
        emailReply: z.boolean().optional(),
        emailUsage: z.boolean().optional(),
        emailReceipt: z.boolean().optional(),
        webPushReply: z.boolean().optional(),
        webPushUsage: z.boolean().optional(),
        webPushReceipt: z.boolean().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return prisma.settings.update({
        where: {
          userId: ctx.session.user.id,
        },
        data: input,
      });
    }),
  generateKey: protectedProcedure.mutation(async ({ ctx }) => {
    if (!['ENTERPRISE', 'PRO'].includes(ctx.session.user.plan)) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Need a Pro+ plan',
      });
    }
    const key = `cpk_${nanoid()}`;
    await prisma.settings.update({
      where: {
        userId: ctx.session.user.id,
      },
      data: {
        sdkKey: key,
      },
    });
  }),
  deleteAccount: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    await prisma.$transaction([
      prisma.like.deleteMany({
        where: {
          userId,
        },
      }),
      prisma.comment.deleteMany({
        where: {
          userId,
        },
      }),
      prisma.project.deleteMany({
        where: {
          userId,
        },
      }),
      prisma.member.deleteMany({
        where: {
          userId,
        },
      }),
      prisma.notificationMessage.deleteMany({
        where: {
          OR: [
            {
              triggeredById: userId,
            },
            {
              recipientId: userId,
            },
          ],
        },
      }),
      prisma.notificationSubscription.deleteMany({
        where: {
          userId,
        },
      }),
      prisma.settings.deleteMany({
        where: {
          userId,
        },
      }),
      prisma.account.deleteMany({
        where: {
          userId,
        },
      }),
      prisma.user.deleteMany({
        where: {
          id: userId,
        },
      }),
    ]);
  }),
});
