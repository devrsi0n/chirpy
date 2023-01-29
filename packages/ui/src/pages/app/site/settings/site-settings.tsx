import * as React from 'react';

import { PageTitle } from '../../../../blocks';
import { Tabs } from '../../../../components';
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
    <AppLayout title="Site settings" subdomain={subdomain}>
      <PageTitle className="mb-4">Site Settings</PageTitle>
      <Tabs defaultValue="general">
        <Tabs.List>
          <Tabs.Trigger value="general">General</Tabs.Trigger>
          <Tabs.Trigger value="customDomain">Custom domain</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="general">
          <SiteGeneralSettings subdomain={subdomain} data={data} />
        </Tabs.Content>
        <Tabs.Content value="customDomain">
          <CustomDomainSettings subdomain={subdomain} data={data} />
        </Tabs.Content>
      </Tabs>
    </AppLayout>
  );
}
