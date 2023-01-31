import * as React from 'react';

import { PageTitle } from '../../../../blocks';
import { AppLayout } from '../../components/app-layout';

export type SiteAnalyticsProps = {
  subdomain: string;
};

export function SiteAnalytics({ subdomain }: SiteAnalyticsProps): JSX.Element {
  return (
    <AppLayout title="Site Analytics" subdomain={subdomain}>
      <PageTitle className="mb-4">Site Analytics</PageTitle>
    </AppLayout>
  );
}
