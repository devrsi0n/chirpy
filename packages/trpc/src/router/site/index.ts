import { parseSubdomain } from '@chirpy-dev/utils';
import { JsonObject } from 'type-fest';
import { z } from 'zod';

import { prisma } from '../../db/client';
import { protectedProcedure, publicProcedure, router } from '../../trpc-server';
import { checkDomain, createDomain, deleteDomain } from './domain';
import {
  checkDuplicatedSubdomain,
  checkUserAuthorization,
  getRecordMapByUrl,
} from './utils';
import {
  CREATE_INPUT_VALIDATION,
  UPDATE_INPUT_VALIDATION,
} from './validations';

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
      const recordMap = (await getRecordMapByUrl(
        input.templateUrl,
      )) as unknown as JsonObject;
      const result = await prisma.site.create({
        data: {
          ...input,
          recordMap,
          managerId: ctx.session.user.id,
        },
        select: {
          id: true,
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
        templateUrl: true,
        subdomain: true,
        customDomain: true,
        description: true,
        posts: {
          select: {
            id: true,
            slug: true,
            image: true,
          },
        },
      },
    });
    return result;
  }),
  createDomain: protectedProcedure
    .input(
      z.object({
        siteId: z.string(),
        customDomain: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await checkUserAuthorization(ctx.session.user.id, input.siteId);
      return await createDomain(input.customDomain, input.siteId);
    }),
  checkDomain: protectedProcedure.input(z.string()).query(async ({ input }) => {
    return checkDomain(input);
  }),
  deleteDomain: protectedProcedure
    .input(
      z.object({
        siteId: z.string(),
        customDomain: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await checkUserAuthorization(ctx.session.user.id, input.siteId);
      await deleteDomain(input.customDomain, input.siteId);
    }),
  increasePV: publicProcedure
    .input(
      z.object({
        hostname: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const subdomain = parseSubdomain(input.hostname);
      const filter =
        subdomain === null
          ? {
              customDomain: input.hostname,
            }
          : {
              subdomain,
            };
      await prisma.site.update({
        where: filter,
        data: {
          pv: {
            increment: 1,
          },
        },
      });
    }),
});
