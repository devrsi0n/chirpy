import * as React from 'react';

import { PageTitle, SettingsCard, SiteLayout } from '../blocks';
import { Button, Divider } from '../components';

export type AccountSettingsProps = {
  //
};

export function AccountSettings(_props: AccountSettingsProps): JSX.Element {
  return (
    <SiteLayout title="Account settings">
      <PageTitle>Account settings</PageTitle>
      <section>
        <SettingsCard>
          <SettingsCard.Header>Notifications</SettingsCard.Header>
          <SettingsCard.Body>
            {/* <Toggle checked label="Email" reverse /> */}
            <Divider />
            {/* <Toggle checked label="Web push" reverse /> */}
          </SettingsCard.Body>
          <SettingsCard.Footer>
            <Button color="primary" variant="solid">
              Save
            </Button>
          </SettingsCard.Footer>
        </SettingsCard>
      </section>
    </SiteLayout>
  );
}
