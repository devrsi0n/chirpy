import { z } from 'zod';

import { prisma } from '../common/db';
import { router, protectedProcedure } from '../trpc-server';

export const projectRouter = router({
  all: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const projects = await prisma.project.findMany({
        where: {
          userId: input.userId,
        },
        select: {
          id: true,
          name: true,
          domain: true,
          createdAt: true,
          pages: {
            select: {
              id: true,
              title: true,
              url: true,
            },
          },
        },
      });
      return projects;
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        domain: z.string(),
        teamId: z.string().nullish(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const projects = await prisma.project.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
        select: {
          id: true,
          name: true,
          domain: true,
          createdAt: true,
          pages: {
            select: {
              id: true,
              title: true,
              url: true,
            },
          },
        },
      });
      return projects;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await prisma.project.deleteMany({
        where: {
          id: input.id,
          // User can only delete their own projects
          userId: ctx.session.user.id,
        },
      });
    }),
});
