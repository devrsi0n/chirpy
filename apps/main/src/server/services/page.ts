import { Page, prisma } from '@chirpy-dev/trpc';
import { NextApiRequest, NextApiResponse } from 'next';

import { ERR_UNMATCHED_DOMAIN } from '../common/error-code';
import { ResponseError } from '../types/error';

export type PagePayload = Page | ResponseError;

export async function getPage(
  req: NextApiRequest,
  res: NextApiResponse<PagePayload>,
): Promise<void> {
  const { url, domain, title } = req.query as {
    [key: string]: string;
  };

  const refererDomain = new URL(url).hostname;
  if (
    !url ||
    !domain ||
    (!isLocalDomain(refererDomain) && domain !== refererDomain)
  ) {
    return res.status(400).json({
      error: `url(${url}) and domain(${domain}) must be matched`,
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
      createdAt: true,
    },
  });
  const projectId = project?.id;
  if (!projectId) {
    return res.status(500).json({
      code: ERR_UNMATCHED_DOMAIN,
      error: `Wrong domain(${domain}), you may need to create a project first, or your configuration is wrong`,
    });
  }
  // Create page if not exist
  const page = await prisma.page.upsert({
    where: {
      url,
    },
    create: {
      url,
      projectId,
      title,
    },
    update: {
      title,
    },
  });

  return res.json(page);
}

const isLocalDomain = (domain: string) =>
  ['localhost', '127.0.0.1'].includes(domain);
