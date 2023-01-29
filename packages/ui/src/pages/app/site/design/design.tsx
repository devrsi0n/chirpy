import * as React from 'react';

import { PageTitle } from '../../../../blocks';
import { AppLayout } from '../../components/app-layout';

export type SiteDesignProps = {
  subdomain: string;
};

export function SiteDesign({ subdomain }: SiteDesignProps): JSX.Element {
  return (
    <AppLayout title="Site settings" subdomain={subdomain}>
      <PageTitle className="mb-4">Design</PageTitle>
    </AppLayout>
  );
}
