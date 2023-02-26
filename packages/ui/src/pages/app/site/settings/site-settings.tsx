import * as React from 'react';

import { PageTitle } from '../../../../blocks';
import { UnderlineTabs } from '../../../../components';
import { trpcClient } from '../../../../utilities';
import { AppLayout } from '../../components/app-layout';
import { CustomDomainSettings } from './custom-domain-settings';
import { SiteGeneralSettings } from './general-settings';

export type SiteSettingsProps = {
  subdomain: string;
};

export function SiteSettings({ subdomain }: SiteSettingsProps): JSX.Element {
  const { data } = trpcClient.site.bySubdomain.useQuery(subdomain);

  return (
    <AppLayout title="Site Settings" subdomain={subdomain}>
      <PageTitle className="mb-4">Site Settings</PageTitle>
      <UnderlineTabs defaultValue="general">
        <UnderlineTabs.List>
          <UnderlineTabs.Trigger value="general">General</UnderlineTabs.Trigger>
          <UnderlineTabs.Trigger value="customDomain">
            Custom domain
          </UnderlineTabs.Trigger>
        </UnderlineTabs.List>
        <UnderlineTabs.Content value="general">
          <SiteGeneralSettings subdomain={subdomain} data={data} />
        </UnderlineTabs.Content>
        <UnderlineTabs.Content value="customDomain">
          <CustomDomainSettings subdomain={subdomain} data={data} />
        </UnderlineTabs.Content>
      </UnderlineTabs>
    </AppLayout>
  );
}
