import { ROUTER_ERROR_DUPLICATED_SITE_SUBDOMAIN } from '@chirpy-dev/utils';
import { TRPCError } from '@trpc/server';

import { prisma } from '../../db/client';
import { notion } from '../../notion/client';

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

export async function getRecordMapByUrl(templateUrl: string) {
  const url = new URL(templateUrl);
  const pageId = url.pathname.split('-').pop();
  if (!pageId) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Invalid Notion template URL',
    });
  }
  const recordMap = await notion.getPage(pageId);
  return recordMap;
}
