import { Post } from '@chirpy-dev/trpc';

export type PostPage = Pick<
  Post,
  'pageId' | 'title' | 'slug' | 'coverImage' | 'updatedAt'
>;
