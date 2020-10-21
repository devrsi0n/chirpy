import { queryType } from '@nexus/schema';
import { requireAuth } from '$server/guards/require-auth';

export const Query = queryType({
  definition(t) {
    t.crud.user();

    t.field('currentUser', {
      type: 'User',
      async resolve(_root, args, ctx) {
        const data = await requireAuth(ctx.req);
        return data;
      },
    });
  },
});
