import * as React from 'react';

import { PageTitle } from '../../../../blocks';
import { DocsSiteLayout } from './layout';

export type DocsSiteHomeProps = {
  name: string;
};

export function DocsSiteHome(props: DocsSiteHomeProps): JSX.Element {
  return (
    <DocsSiteLayout>
      <PageTitle>{props.name} Docs</PageTitle>
    </DocsSiteLayout>
  );
}
