import type { Page } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../context';

export async function handleGetPageByProject(
  req: NextApiRequest,
  res: NextApiResponse<Page | null>,
): Promise<void> {
  console.log({ 'req.query': req.query });
  const pages: Page[] = await prisma.page.findMany({
    where: {
      url: req.query.url as string,
      projectId: req.query.projectId as string,
    },
  });
  if (pages.length > 1) {
    console.error(
      `One project can only have one page with url: ${req.query.url} projectId: ${req.query.projectId}`,
    );
    res.json(null);
  } else if (pages.length === 1) {
    let page = pages[0];
    if (page.title !== req.query.title) {
      page = await prisma.page.update({
        where: {
          id: page.id,
        },
        data: {
          title: String(req.query.title) as string,
        },
      });
    }
    res.json(page);
  } else if (pages.length === 0) {
    const createdPage: Page = await prisma.page.create({
      data: {
        url: req.query.url as string,
        title: req.query.title as string,
        project: {
          connect: {
            id: req.query.projectId as string,
          },
        },
      },
    });
    res.json(createdPage);
  } else {
    res.json(null);
  }
}
