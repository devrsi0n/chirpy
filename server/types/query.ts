import { queryType, stringArg } from '@nexus/schema';
import { requireAuth } from '$server/guards/require-auth';
import { prisma } from '$server/context';
import { Page, Comment } from '@prisma/client';
import getOrCreatePage from './resolvers/getOrCreatePage';

export const Query = queryType({
  definition(t) {
    t.crud.user();
    t.crud.page();

    t.list.field('getAllCommentsByPage', {
      type: 'Comment',
      args: {
        // projectId: stringArg({ required: true }),
        pageId: stringArg({ required: true }),
      },
      async resolve(_root, args, ctx): Promise<Comment[]> {
        const comments: Comment[] = await prisma.comment.findMany({
          where: {
            pageId: args.pageId,
          },
        });
        console.log({ comments });
        return comments;
      },
    });

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
        return getOrCreatePage(_root, args);
      },
    });
  },
});
