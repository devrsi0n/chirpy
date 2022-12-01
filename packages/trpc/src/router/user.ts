import { z } from 'zod';

import { prisma } from '../common/db-client';
import { router, protectedProcedure } from '../trpc-server';

export const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    const me = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
      },
    });
    return me;
  }),
  myProfile: protectedProcedure.query(async ({ ctx }) => {
    const me = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    return me;
  }),
  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().nullish(),
        username: z.string().nullish(),
        email: z.string().nullish(),
        bio: z.string().nullish(),
        website: z.string().nullish(),
        twitterUserName: z.string().nullish(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const me = await prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: input,
      });
      return me;
    }),
});
