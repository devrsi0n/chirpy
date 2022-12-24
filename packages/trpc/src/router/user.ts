import { USERNAME_RE } from '@chirpy-dev/utils';
import { z } from 'zod';

import { prisma } from '../db/client';
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
        kind: true,
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
      // Sync validation with client,
      // we may use zod in client as well to keep validation in sync
      z.object({
        name: z.string().nullish(),
        username: z.string().min(3).max(16).regex(USERNAME_RE).nullish(),
        email: z.string().email().nullish(),
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
