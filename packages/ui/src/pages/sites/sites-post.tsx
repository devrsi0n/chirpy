import { ExtendedRecordMap } from '@chirpy-dev/trpc/src/ui';
import * as React from 'react';

import { NotionBlocks } from '../../blocks';
import { SitesLayout } from './sites-layout';

export type SitesPostProps = {
  slug: string;
  recordMap: ExtendedRecordMap;
};

export function SitesPost(props: SitesPostProps): JSX.Element {
  return (
    <SitesLayout>
      <section>
        <NotionBlocks recordMap={props.recordMap} />
      </section>
    </SitesLayout>
  );
}
