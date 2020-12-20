import { nonNull, queryType, stringArg } from 'nexus';
import { Page } from '@prisma/client';

import { requireAuth } from '../guards/require-auth';
import getOrCreatePage from './resolvers/getOrCreatePage';

export const Query = queryType({
  definition(t) {
    t.crud.user();
    t.crud.page();
    t.crud.project();
    t.crud.comment();
    t.crud.comments({
      filtering: {
        id: true,
        parentId: true,
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
