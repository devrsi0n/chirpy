import * as React from 'react';

import { PageTitle, SiteLayout } from '../blocks';

export type SettingsProps = {
  //
};

export function Settings(props: SettingsProps): JSX.Element {
  return (
    <SiteLayout title="Personal account settings">
      <PageTitle>Personal account settings</PageTitle>
    </SiteLayout>
  );
}
