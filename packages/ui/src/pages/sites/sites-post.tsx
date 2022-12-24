import { ExtendedRecordMap } from '@chirpy-dev/trpc/src/ui';
import * as React from 'react';
import { NotionRenderer } from 'react-notion-x';

export type SitesPostProps = {
  slug: string;
  recordMap: ExtendedRecordMap;
};

export function SitesPost(props: SitesPostProps): JSX.Element {
  return (
    <div>
      <h1>Post {props.slug}</h1>
      <section>
        <NotionRenderer
          recordMap={props.recordMap}
          fullPage={true}
          darkMode={false}
        />
      </section>
    </div>
  );
}
