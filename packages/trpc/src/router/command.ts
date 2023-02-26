import { ExtendedRecordMap } from 'notion-types';
import { getPageTitle } from 'notion-utils';

import { prisma } from '../db';
import { publicProcedure, tRouter } from '../trpc-server';

export const commandRouter = tRouter({
  searchBlog: publicProcedure.query(async () => {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        slug: true,
        recordMap: true,
      },
    });
    return posts.map(({ slug, id, recordMap }) => {
      return {
        id,
        slug,
        title: getPageTitle(recordMap as unknown as ExtendedRecordMap),
      };
    });
  }),
});
