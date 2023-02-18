import { log } from 'next-axiom';
import { Block } from 'notion-types';
import { JsonObject } from 'type-fest';

import { prisma } from '../db/client';
import { notion } from './client';

export type { ExtendedRecordMap, PageMap } from 'notion-types';

export async function getAndSavePageRecordMap(pageId: string, postId: string) {
  const recordMap = await getNotionPage(pageId);
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

declare global {
  // eslint-disable-next-line no-var
  var __cacheStore: Map<any, any>;
}
const cacheStore = global.__cacheStore || new Map();
global.__cacheStore = cacheStore;

export const getNotionPage: typeof notion.getPage = async (pageId, options) => {
  return notion.getPage(pageId, {
    ...options,
    gotOptions: {
      ...options?.gotOptions,
      cache: cacheStore,
    },
  });
};

export function defaultMapImageUrl(url: string, block: Block): string | null {
  if (!url) {
    return null;
  }

  if (url.startsWith('data:')) {
    return url;
  }

  // more recent versions of notion don't proxy unsplash images
  if (url.startsWith('https://images.unsplash.com')) {
    return url;
  }

  try {
    const u = new URL(url);

    if (
      u.pathname.startsWith('/secure.notion-static.com') &&
      u.hostname.endsWith('.amazonaws.com') &&
      u.searchParams.has('X-Amz-Credential') &&
      u.searchParams.has('X-Amz-Signature') &&
      u.searchParams.has('X-Amz-Algorithm')
    ) {
      // if the URL is already signed, then use it as-is
      return url;
    }
  } catch {
    // ignore invalid urls
  }

  if (url.startsWith('/images')) {
    url = `https://www.notion.so${url}`;
  }

  url = `https://www.notion.so${
    url.startsWith('/image') ? url : `/image/${encodeURIComponent(url)}`
  }`;

  const notionImageUrlV2 = new URL(url);
  let table = block.parent_table === 'space' ? 'block' : block.parent_table;
  if (table === 'collection' || table === 'team') {
    table = 'block';
  }
  notionImageUrlV2.searchParams.set('table', table);
  notionImageUrlV2.searchParams.set('id', block.id);
  notionImageUrlV2.searchParams.set('cache', 'v2');

  url = notionImageUrlV2.toString();

  return url;
}
