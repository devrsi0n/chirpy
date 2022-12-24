import {
  ROUTER_ERROR_VERCEL_ADD_DOMAIN_FAILED,
  ROUTER_ERROR_VERCEL_DELETE_DOMAIN_FAILED,
} from '@chirpy-dev/utils';
import { TRPCError } from '@trpc/server';
import { log } from 'next-axiom';

import { prisma } from '../../db/client';

/**
 * Add Domain
 *
 * Adds a new domain to the Vercel project using a provided
 * `domain` & `siteId`
 */
export async function createDomain(domain: string, siteId: string) {
  let response: Response;
  try {
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
    log.error('Get vercel project domain failed', error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: ROUTER_ERROR_VERCEL_ADD_DOMAIN_FAILED,
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

  // Domain is successfully added
  await prisma.site.update({
    where: {
      id: siteId,
    },
    data: {
      customDomain: domain,
    },
  });
}

/**
 * Check a custom domain is valid
 */
export async function checkDomain(customDomain: string) {
  const response = await fetch(
    `https://api.vercel.com/v6/domains/${customDomain}/config`,
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

/**
 * Delete Domain
 *
 * Remove a domain from the vercel project using a provided
 * `domain` & `siteId` parameters
 */
export async function deleteDomain(
  domain: string,
  siteId: string,
): Promise<void> {
  let response: Response;
  try {
    response = await fetch(`https://api.vercel.com/v6/domains/${domain}`, {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
      },
      method: 'DELETE',
    });
  } catch (error) {
    log.error('Delete vercel project domain failed', error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: ROUTER_ERROR_VERCEL_DELETE_DOMAIN_FAILED,
      cause: error,
    });
  }
  await response.json();

  await prisma.site.update({
    where: {
      id: siteId as string,
    },
    data: {
      customDomain: null,
    },
  });
}
