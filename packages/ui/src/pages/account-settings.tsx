import * as React from 'react';

import { PageTitle, SettingsCard, SiteLayout } from '../blocks';
import { Button, Divider, Link, Text, Toggle } from '../components';

export type AccountSettingsProps = {
  //
};

export function AccountSettings(_props: AccountSettingsProps): JSX.Element {
  return (
    <SiteLayout title="Account settings">
      <PageTitle>Account settings</PageTitle>
      <section>
        <SettingsCard>
          <SettingsCard.Header>Email</SettingsCard.Header>
          <SettingsCard.Body>
            <Toggle
              checked
              label="Reply notification"
              reverse
              hintText="When received a reply to your comments"
            />
            <Divider />
            <Toggle
              checked
              label="Usage warnings"
              reverse
              hintText="When your usage is going to exceed the plan limits"
            />
            <Divider />
            <Toggle checked label="Payment receipt" reverse />
          </SettingsCard.Body>
          <SettingsCard.Footer>
            <Button color="primary" variant="solid">
              Save
            </Button>
          </SettingsCard.Footer>
        </SettingsCard>
        <SettingsCard>
          <SettingsCard.Header>Web push</SettingsCard.Header>
          <SettingsCard.Body>
            <Text className="mb-8">
              {`What's `}
              <Link
                variant="primary"
                href="/docs/features/notifications#web-push"
              >
                Web push
              </Link>
              ?
            </Text>
            <Toggle
              checked
              label="Reply notification"
              reverse
              hintText="When received a reply to your comments"
            />
            <Divider />
            <Toggle
              checked
              label="Usage warnings"
              reverse
              hintText="When your usage is going to exceed the plan limits"
            />
            <Divider />
            <Toggle checked label="Payment receipt" reverse />
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
