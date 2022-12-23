import * as React from 'react';

import { PageTitle, SiteLayout } from '../../../../blocks';
import { Tabs } from '../../../../components';
import { trpcClient } from '../../../../utilities';
import { CustomDomainSettings } from './custom-domain-settings';
import { SiteGeneralSettings } from './general-settings';

export type SiteSettingsProps = {
  id: string;
};

export function SiteSettings({ id }: SiteSettingsProps): JSX.Element {
  const { data } = trpcClient.site.byId.useQuery(id);

  return (
    <SiteLayout title="Site settings">
      <PageTitle className="mb-4">Site settings</PageTitle>
      <Tabs defaultValue="general">
        <Tabs.List>
          <Tabs.Trigger value="general">General</Tabs.Trigger>
          <Tabs.Trigger value="customDomain">Custom domain</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="general">
          <SiteGeneralSettings siteId={id} data={data} />
        </Tabs.Content>
        <Tabs.Content value="customDomain">
          <CustomDomainSettings siteId={id} data={data} />
        </Tabs.Content>
      </Tabs>
    </SiteLayout>
  );
}
