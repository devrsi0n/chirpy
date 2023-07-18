import { Settings } from '@chirpy-dev/trpc';
import { trpc } from '@chirpy-dev/trpc/src/client';
import * as React from 'react';

import { PageTitle, SettingsCard, SiteLayout } from '../../blocks';
import {
  Button,
  Divider,
  Link,
  Spinner,
  Text,
  Toggle,
  useToast,
} from '../../components';
import { useForm } from '../../hooks';
import { MUTATION_ERROR } from '../../strings';
import { logger } from '../../utilities';

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
      emailReceipt: props.emailReceipt,
      emailReply: props.emailReply,
      emailUsage: props.emailUsage,
    },
  });
  const { showToast } = useToast();
  const { mutateAsync, isLoading } = trpc.settings.update.useMutation();

  const handleSave = handleSubmit(async (fields) => {
    try {
      await mutateAsync(fields);
      showToast({
        type: 'success',
        title: 'Email settings saved',
      });
    } catch (error) {
      logger.error(`Save email settings failed`, { error });
      showToast({
        type: 'error',
        title: MUTATION_ERROR,
      });
      throw error;
    }
  });
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
          {isLoading ? (
            <Spinner className="!text-gray-100">Save</Spinner>
          ) : (
            'Save'
          )}
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
      webPushReceipt: props.webPushReceipt,
      webPushReply: props.webPushReply,
      webPushUsage: props.webPushUsage,
    },
  });
  const { showToast } = useToast();
  const { mutateAsync, isLoading } = trpc.settings.update.useMutation();

  const handleSave = handleSubmit(async (fields) => {
    try {
      await mutateAsync(fields);
      showToast({
        type: 'success',
        title: 'Web push settings saved',
      });
    } catch (error) {
      logger.error(`Save web push settings failed`, { error });
      showToast({
        type: 'error',
        title: MUTATION_ERROR,
      });
      throw error;
    }
  });
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
          {isLoading ? (
            <Spinner className="!text-gray-100">Save</Spinner>
          ) : (
            'Save'
          )}
        </Button>
      </SettingsCard.Footer>
    </SettingsCard>
  );
}
