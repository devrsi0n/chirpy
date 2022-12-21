import { ROUTER_ERROR_DUPLICATED_SITE_SUBDOMAIN } from '@chirpy-dev/utils';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '../../common/db-client';

export const CREATE_INPUT_VALIDATION = z.object({
  name: z.string(),
  subdomain: z.string().regex(/^[A-Za-z]+$/),
  description: z.string(),
});

export const UPDATE_INPUT_VALIDATION = CREATE_INPUT_VALIDATION.extend({
  id: z.string(),
});

export async function checkDuplicatedSubdomain(subdomain: string) {
  const existing = await prisma.site.findFirst({
    where: {
      subdomain: subdomain,
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
}

/**
 * Check if the user has the rights
 */
export async function checkUserAuthorization(userId: string, siteId: string) {
  const site = await prisma.site.findFirst({
    where: {
      id: siteId,
      managerId: userId,
    },
    select: {
      id: true,
      subdomain: true,
    },
  });
  if (!site?.id) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Malicious request',
    });
  }
  return site;
}
