import { ExtendedRecordMap } from '@chirpy-dev/trpc/src/ui';
import * as React from 'react';

import { NotionBlocks } from '../../blocks';
import { BlogSiteLayout } from './components/blog-site/layout';

export type SitesPostProps = {
  slug: string;
  recordMap: ExtendedRecordMap;
};

export function BlogPost(props: SitesPostProps): JSX.Element {
  return (
    <BlogSiteLayout>
      <section>
        <NotionBlocks recordMap={props.recordMap} />
      </section>
    </BlogSiteLayout>
  );
}
