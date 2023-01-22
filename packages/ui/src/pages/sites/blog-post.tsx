import { ExtendedRecordMap } from '@chirpy-dev/trpc/src/ui';
import * as React from 'react';

import { NotionBlocks } from '../../blocks';
import { SitesLayout } from './components/sites-layout';

export type SitesPostProps = {
  slug: string;
  recordMap: ExtendedRecordMap;
};

export function BlogPost(props: SitesPostProps): JSX.Element {
  return (
    <SitesLayout>
      <section>
        <NotionBlocks recordMap={props.recordMap} />
      </section>
    </SitesLayout>
  );
}