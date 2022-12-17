import { z } from 'zod';

import { prisma } from '../../common/db-client';
import { protectedProcedure, router } from '../../trpc-server';
import {
  checkDuplicatedSubdomain,
  checkUserAuthorization,
  CREATE_INPUT_VALIDATION,
  UPDATE_INPUT_VALIDATION,
} from './utils';

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
    .input(CREATE_INPUT_VALIDATION)
    .mutation(async ({ input, ctx }) => {
      await checkDuplicatedSubdomain(input.subdomain);
      const result = await prisma.site.create({
        data: {
          ...input,
          managerId: ctx.session.user.id,
        },
      });
      return result;
    }),
  update: protectedProcedure
    .input(UPDATE_INPUT_VALIDATION)
    .mutation(async ({ input, ctx }) => {
      const site = await checkUserAuthorization(ctx.session.user.id, input.id);
      if (site.subdomain !== input.subdomain) {
        // Only check duplicated subdomain when it changes
        await checkDuplicatedSubdomain(input.subdomain);
      }
      const result = await prisma.site.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
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
        customDomain: true,
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
