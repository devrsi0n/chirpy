import { ROUTER_ERROR_DUPLICATED_SITE_SUBDOMAIN } from '@chirpy-dev/utils';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '../common/db-client';
import { protectedProcedure, router } from '../trpc-server';

export const siteRouter = router({
  all: protectedProcedure.query(async ({ ctx }) => {
    const sites = await prisma.site.findMany({
      where: {
        OR: [
          {
            managerId: ctx.session.user.id,
          },
          {
            members: {
              some: {
                userId: ctx.session.user.id,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        subdomain: true,
        createdAt: true,
        posts: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    return sites;
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        subdomain: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const existing = await prisma.site.findFirst({
        where: {
          subdomain: input.subdomain,
        },
        select: {
          subdomain: true,
        },
      });
      if (existing?.subdomain) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: ROUTER_ERROR_DUPLICATED_SITE_SUBDOMAIN,
        });
      }
      const result = await prisma.site.create({
        data: {
          ...input,
          managerId: ctx.session.user.id,
        },
      });
      return result;
    }),
  byId: protectedProcedure.input(z.string()).query(async ({ input }) => {
    const result = await prisma.site.findUnique({
      where: {
        id: input,
      },
      select: {
        id: true,
        name: true,
        subdomain: true,
        description: true,
        posts: {
          select: {
            id: true,
            title: true,
            description: true,
            slug: true,
            image: true,
          },
        },
      },
    });
    return result;
  }),
});
