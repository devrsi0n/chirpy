import { prisma } from '$server/context';
import { Page } from '@prisma/client';

export type Args = {
  projectId: string;
  title: string;
  url: string;
};

export type Root = {
  // Empty
};

export default async function getOrCreatePage(_root: Root, args: Args): Promise<Page | null> {
  const pages: Page[] = await prisma.page.findMany({
    where: {
      url: args.url,
      projectId: args.projectId,
    },
  });
  if (pages.length > 1) {
    console.error(
      `One project can only have one page with url: ${args.url} projectId: ${args.projectId}`,
    );
    return null;
  } else if (pages.length === 1) {
    let page = pages[0];
    if (page.title !== args.title) {
      page = await prisma.page.update({
        where: {
          id: page.id,
        },
        data: {
          title: args.title,
        },
      });
    }
    return page;
  } else if (pages.length === 0) {
    const createdPage: Page = await prisma.page.create({
      data: {
        url: args.url,
        title: args.title,
        project: {
          connect: {
            id: args.projectId,
          },
        },
      },
    });
    return createdPage;
  }
  return null;
}
