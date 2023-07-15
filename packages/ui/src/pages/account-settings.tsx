import { Settings } from '@chirpy-dev/trpc';
import { trpc } from '@chirpy-dev/trpc/src/client';
import * as React from 'react';

import { PageTitle, SettingsCard, SiteLayout } from '../blocks';
import { Button, Divider, Link, Spinner, Text, Toggle } from '../components';
import { useForm } from '../hooks';

export type AccountSettingsProps = {
  //
};

export function AccountSettings(_props: AccountSettingsProps): JSX.Element {
  const { data: settings } = trpc.settings.all.useQuery();

  return (
    <SiteLayout title="Account settings">
      <PageTitle>Account settings</PageTitle>
      <section>
        {settings ? (
          <>
            <EmailNotifications {...settings} />
            <WebPushNotifications {...settings} />
          </>
        ) : (
          <Spinner className="mt-16" />
        )}
      </section>
    </SiteLayout>
  );
}

type EmailForm = Pick<Settings, 'emailReply' | 'emailUsage' | 'emailReceipt'>;

function EmailNotifications(props: EmailForm) {
  const { register, handleSubmit } = useForm<EmailForm>({
    defaultValues: {
      ...props,
    },
  });
  const handleSave = handleSubmit(async () => {});
  return (
    <SettingsCard>
      <SettingsCard.Header>Email</SettingsCard.Header>
      <SettingsCard.Body>
        <Toggle
          {...register('emailReply')}
          label="Reply notification"
          reverse
          hintText="When received a reply to your comments"
        />
        <Divider />
        <Toggle
          {...register('emailUsage')}
          label="Usage warnings"
          reverse
          hintText="When your usage is going to exceed the plan limits"
        />
        <Divider />
        <Toggle {...register('emailReceipt')} label="Payment receipt" reverse />
      </SettingsCard.Body>
      <SettingsCard.Footer>
        <Button color="primary" variant="solid" onClick={handleSave}>
          Save
        </Button>
      </SettingsCard.Footer>
    </SettingsCard>
  );
}

type WebPushForm = Pick<
  Settings,
  'webPushReceipt' | 'webPushReply' | 'webPushUsage'
>;

function WebPushNotifications(props: WebPushForm) {
  const { register, handleSubmit } = useForm<WebPushForm>({
    defaultValues: {
      ...props,
    },
  });
  const handleSave = handleSubmit(async () => {});
  return (
    <SettingsCard>
      <SettingsCard.Header>Web push</SettingsCard.Header>
      <SettingsCard.Body>
        <Text className="mb-8">
          {`What's `}
          <Link variant="primary" href="/docs/features/notifications#web-push">
            Web push
          </Link>
          ?
        </Text>
        <Toggle
          {...register('webPushReply')}
          label="Reply notification"
          reverse
          hintText="When received a reply to your comments"
        />
        <Divider />
        <Toggle
          {...register('webPushUsage')}
          label="Usage warnings"
          reverse
          hintText="When your usage is going to exceed the plan limits"
        />
        <Divider />
        <Toggle
          {...register('webPushReceipt')}
          label="Payment receipt"
          reverse
        />
      </SettingsCard.Body>
      <SettingsCard.Footer>
        <Button color="primary" variant="solid" onClick={handleSave}>
          Save
        </Button>
      </SettingsCard.Footer>
    </SettingsCard>
  );
}
