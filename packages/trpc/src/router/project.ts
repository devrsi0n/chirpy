import { z } from 'zod';

import { prisma } from '../common/db-client';
import { protectedProcedure, publicProcedure, router } from '../trpc-server';

export const projectRouter = router({
  all: publicProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return getAllProjects({
        username: input.username,
      });
    }),
  // Must use publicProcedure since it's used by ssg
  byDomain: publicProcedure.input(z.string()).query(async ({ input }) => {
    const project = await prisma.project.findUnique({
      where: {
        domain: input,
      },
      select: {
        id: true,
        name: true,
        domain: true,
        theme: true,
        createdAt: true,
      },
    });
    return project;
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
        domain: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await prisma.$transaction([
        // Set comment foreign key to null manually
        // to fix db `onDelete: NoAction` protection.
        prisma.comment.updateMany({
          where: {
            page: {
              project: {
                domain: input.domain,
              },
            },
          },
          data: {
            parentId: null,
          },
        }),
        prisma.project.deleteMany({
          where: {
            domain: input.domain,
            // User can only delete their own projects
            userId: ctx.session.user.id,
          },
        }),
      ]);
    }),
  updateTheme: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        theme: z.object({
          colors: z.object({
            light: z.any(),
            dark: z.any(),
          }),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const project = await prisma.project.updateMany({
        where: {
          id: input.projectId,
          userId: ctx.session.user.id,
        },
        data: {
          theme: input.theme,
        },
      });
      return project;
    }),
});

async function getAllProjects({ username }: { username: string }) {
  const projects = await prisma.project.findMany({
    where: {
      user: {
        username,
      },
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
}
