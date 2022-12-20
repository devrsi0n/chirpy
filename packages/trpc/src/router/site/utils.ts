import {
  ROUTER_ERROR_3P_API_FAILED,
  ROUTER_ERROR_DUPLICATED_SITE_SUBDOMAIN,
  ROUTER_ERROR_PRISMA_FAILED,
} from '@chirpy-dev/utils';
import { TRPCError } from '@trpc/server';
import { log } from 'next-axiom';
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

/**
 * Add Domain
 *
 * Adds a new domain to the Vercel project using a provided
 * `domain` & `siteId`
 */
export async function createDomain(domain: string, siteId: string) {
  let response: Response;
  try {
    console.log({
      projectId: process.env.PROJECT_ID_VERCEL,
      teamId: process.env.TEAM_ID_VERCEL,
      authToken: process.env.AUTH_BEARER_TOKEN,
    });
    response = await fetch(
      `https://api.vercel.com/v8/projects/${process.env.PROJECT_ID_VERCEL}/domains`,
      {
        body: `{\n  "name": "${domain}"\n}`,
        headers: {
          Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );
  } catch (error) {
    log.error('Get project domain failed', error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: ROUTER_ERROR_3P_API_FAILED,
      cause: error,
    });
  }

  const data = await response.json();
  // Domain is already owned by another team but you can request delegation to access it
  if (data.error?.code === 'forbidden') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: JSON.stringify(data, null, 2),
    });
  }

  // Domain is already being used by a different project
  if (
    data.error?.code === 'domain_taken' ||
    data.error?.code === 'not-this-user'
  ) {
    throw new TRPCError({
      code: 'CONFLICT',
      message: data.error,
    });
  }
  try {
    // Domain is successfully added
    await prisma.site.update({
      where: {
        id: siteId,
      },
      data: {
        customDomain: domain,
      },
    });
  } catch (error) {
    log.error(
      `Create domain error, domain: ${domain}, siteId: ${siteId}`,
      error,
    );
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: ROUTER_ERROR_PRISMA_FAILED,
    });
  }
}

export async function checkCustomDomain(customDomain: string) {
  const response = await fetch(
    `https://api.vercel.com/v6/domains/${customDomain}/config?teamId=${process.env.TEAM_ID_VERCEL}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
    },
  );

  const data = await response.json();

  const isValid = data?.configuredBy ? true : false;
  return isValid;
}
