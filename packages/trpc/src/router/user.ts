import { z } from 'zod';

import { prisma } from '../common/db-client';
import { protectedProcedure, router } from '../trpc-server';

export const userRouter = router({
  myProfile: protectedProcedure.query(async ({ ctx }) => {
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
        emailVerified: true,
        bio: true,
        website: true,
        twitterUserName: true,
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
