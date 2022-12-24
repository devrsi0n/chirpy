import { ExtendedRecordMap } from '@chirpy-dev/trpc/src/ui';
import * as React from 'react';

import { NotionBlocks } from '../../blocks';

export type SitesPostProps = {
  slug: string;
  recordMap: ExtendedRecordMap;
};

export function SitesPost(props: SitesPostProps): JSX.Element {
  return (
    <div>
      <h1>Post {props.slug}</h1>
      <section>
        <NotionBlocks recordMap={props.recordMap} />
      </section>
    </div>
  );
}
