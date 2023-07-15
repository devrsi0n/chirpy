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
});
