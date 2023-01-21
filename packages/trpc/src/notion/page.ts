import { log } from 'next-axiom';
import { JsonObject } from 'type-fest';

import { prisma } from '../db/client';
import { notion } from './client';

export type { ExtendedRecordMap } from 'notion-types';

export async function getPageRecordMap(pageId: string, postId: string) {
  const recordMap = await notion.getPage(pageId);
  log.debug('recordMap', recordMap);
  // Always update the recordMap when getting a new version
  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      recordMap: recordMap as unknown as JsonObject,
    },
  });
  return recordMap;
}
