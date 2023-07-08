import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '../../common/db-client';

export const PAGE_BY_URL_INPUT = z.object({
  url: z.string().url(),
  domain: z.string(),
  title: z.string(),
});

export async function getPage({
  url,
  domain,
  title,
}: z.infer<typeof PAGE_BY_URL_INPUT>) {
  const pageURL = new URL(url);
  const refererDomain = pageURL.hostname;
  if (
    !url ||
    !domain ||
    (!isLocalDomain(refererDomain) && domain !== refererDomain)
  ) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: `url(${url}) and domain(${domain}) must be matched`,
    });
  }
  const project = await prisma.project.findUnique({
    where: {
      domain,
    },
    select: {
      id: true,
      name: true,
      domain: true,
      theme: true,
      queryParameters: true,
      createdAt: true,
    },
  });
  const projectId = project?.id;
  if (!projectId) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: `Wrong domain(${domain}), you may need to create the project first, or your configuration is wrong`,
    });
  }
  // URL's hash is not needed, or we'll treat it as a new URL
  pageURL.hash = '';
  const identifierParameters = project.queryParameters?.split(',') || [];
  const toBeDeletedKeys: string[] = [];
  pageURL.searchParams.forEach((_value, key) => {
    if (!identifierParameters.includes(key)) {
      toBeDeletedKeys.push(key);
    }
  });
  toBeDeletedKeys.forEach((key) => pageURL.searchParams.delete(key));

  // Create page if not exist, or update the title
  const page = await prisma.page.upsert({
    where: {
      url: pageURL.href,
    },
    create: {
      url: pageURL.href,
      projectId,
      title,
    },
    update: {
      title,
    },
  });

  return page;
}
const isLocalDomain = (domain: string) =>
  ['localhost', '127.0.0.1'].includes(domain);
