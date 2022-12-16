import { ROUTER_ERROR_DUPLICATED_PROJECT_DOMAIN } from '@chirpy-dev/utils';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '../common/db-client';
import { router, protectedProcedure, publicProcedure } from '../trpc-server';

export const projectRouter = router({
  all: protectedProcedure.query(async ({ ctx }) => {
    const projects = await prisma.project.findMany({
      where: {
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
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const existing = await prisma.project.findFirst({
        where: {
          domain: input.domain,
        },
        select: {
          domain: true,
        },
      });
      if (existing?.domain) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: ROUTER_ERROR_DUPLICATED_PROJECT_DOMAIN,
        });
      }
      const project = await prisma.project.create({
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
      return project;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
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
                id: input.id,
              },
            },
          },
          data: {
            parentId: null,
          },
        }),
        prisma.project.deleteMany({
          where: {
            id: input.id,
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
