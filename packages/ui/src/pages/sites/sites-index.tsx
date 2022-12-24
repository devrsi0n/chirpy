import { ExtendedRecordMap } from '@chirpy-dev/trpc/src/ui';
import * as React from 'react';

import { NotionBlocks, PageTitle, SiteLayout } from '../../blocks';

export type SitesIndexProps = {
  subdomain: string;
  recordMap: ExtendedRecordMap;
};

export function SitesIndex(props: SitesIndexProps): JSX.Element {
  return (
    <SiteLayout title="Home">
      <PageTitle>Site {props.subdomain}</PageTitle>
      <NotionBlocks
        recordMap={props.recordMap as unknown as ExtendedRecordMap}
      />
    </SiteLayout>
  );
}
