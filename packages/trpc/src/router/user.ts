import { USERNAME_RE } from '@chirpy-dev/utils';
import { z } from 'zod';

import { prisma, User } from '../db';
import { router, protectedProcedure } from '../trpc-server';

export type MeOutput =
  | (Pick<User, 'id' | 'name' | 'username' | 'email' | 'image' | 'kind'> & {
      editableProjectIds: string[];
    })
  | null;

export const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }): Promise<MeOutput> => {
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
        projects: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!me) {
      return null;
    }

    return {
      ...me,
      editableProjectIds: me.projects.map((p) => p.id),
    };
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
