import * as React from 'react';

import { PageTitle } from '../../../blocks';
import { SitesLayout } from './sites-layout';

export type DocsSitesIndexProps = {
  name: string;
};

export function DocsSitesIndex(props: DocsSitesIndexProps): JSX.Element {
  return (
    <SitesLayout>
      <PageTitle>{props.name} Docs</PageTitle>
    </SitesLayout>
  );
}
