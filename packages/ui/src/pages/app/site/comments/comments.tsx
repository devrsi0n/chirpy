import * as React from 'react';

import { PageTitle } from '../../../../blocks';
import { AppLayout } from '../../components/app-layout';

export type SiteCommentsProps = {
  subdomain: string;
};

export function SiteComments({ subdomain }: SiteCommentsProps): JSX.Element {
  return (
    <AppLayout title="Site settings" subdomain={subdomain}>
      <PageTitle className="mb-4">Comments</PageTitle>
    </AppLayout>
  );
}
