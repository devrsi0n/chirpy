import { ExtendedRecordMap } from '@chirpy-dev/trpc/src/ui';
import * as React from 'react';

import { NotionBlocks } from '../../blocks';
import { BlogSiteLayout } from './components/blog-site/layout';
import { PostFields } from './types';

export type SitesPostProps = {
  slug: string;
  recordMap: ExtendedRecordMap;
  posts: PostFields[];
};

export function BlogPost(props: SitesPostProps): JSX.Element {
  return (
    <BlogSiteLayout posts={props.posts}>
      <section>
        <NotionBlocks recordMap={props.recordMap} />
      </section>
    </BlogSiteLayout>
  );
}
