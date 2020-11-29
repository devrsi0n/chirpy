import { nonNull, queryType, stringArg } from '@nexus/schema';
import { Page, Comment } from '@prisma/client';

import { requireAuth } from '../guards/require-auth';
import { prisma } from '../context';
import getOrCreatePage from './resolvers/getOrCreatePage';

export const Query = queryType({
  definition(t) {
    t.crud.user();
    t.crud.page();

    t.list.field('getAllCommentsByPage', {
      type: 'Comment',
      args: {
        // projectId: stringArg(),
        pageId: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx): Promise<Comment[]> {
        const comments: Comment[] = await prisma.comment.findMany({
          where: {
            pageId: args.pageId,
          },
        });
        // console.log({ comments });
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
        projectId: nonNull(stringArg()),
        url: nonNull(stringArg()),
        title: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx): Promise<Page | null> {
        return getOrCreatePage(_root, args);
      },
    });
  },
});
