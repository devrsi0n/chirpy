import { queryType, stringArg } from '@nexus/schema';
import { requireAuth } from '$server/guards/require-auth';
import { prisma } from '$server/context';
import { Page } from '@prisma/client';

export const Query = queryType({
  definition(t) {
    t.crud.user();
    t.crud.page();

    t.field('currentUser', {
      type: 'User',
      async resolve(_root, args, ctx) {
        const data = await requireAuth(ctx.req);
        return data;
      },
    });

    t.field('getOrCreatePage', {
      type: 'Page',
      args: {
        projectId: stringArg({ required: true }),
        url: stringArg({ required: true }),
        title: stringArg({ required: true }),
      },
      async resolve(_root, args, ctx): Promise<Page | null> {
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
      },
    });
  },
});
