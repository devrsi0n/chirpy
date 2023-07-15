import { z } from 'zod';

import { prisma } from '../common/db-client';
import { protectedProcedure, router } from '../trpc-server';

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
});
