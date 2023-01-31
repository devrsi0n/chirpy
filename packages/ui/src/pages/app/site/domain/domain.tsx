import * as React from 'react';

import { PageTitle } from '../../../../blocks';
import { Text } from '../../../../components';
import { AppLayout } from '../../components/app-layout';

export type SiteDomainProps = {
  subdomain: string;
};

export function SiteDomain({ subdomain }: SiteDomainProps): JSX.Element {
  return (
    <AppLayout title="Site Domain" subdomain={subdomain}>
      <PageTitle className="mb-4">Domain</PageTitle>
      <Text>Custom domain & subdomain</Text>
    </AppLayout>
  );
}
