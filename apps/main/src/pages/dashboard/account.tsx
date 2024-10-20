import { Settings } from '@chirpy-dev/trpc';
import { trpc } from '@chirpy-dev/trpc/src/client';
import {
  Button,
  Divider,
  logger,
  MUTATION_ERROR,
  Spinner,
  Toggle,
  useForm,
  useToast,
} from '@chirpy-dev/ui';
import * as React from 'react';

import { DeleteAccountCard } from '../../components/delete-account';
import { SiteLayout } from '../../components/layout';
import { PageTitle } from '../../components/page-title';
import { SDK } from '../../components/sdk';
import { SettingsCard } from '../../components/settings-card';
import { WebPushNotifications } from '../../components/web-push-notifications';

export type AccountSettingsProps = {
  //
};

export default function AccountSettings(
  _props: AccountSettingsProps,
): JSX.Element {
  const { data: settings } = trpc.settings.all.useQuery();

  return (
    <SiteLayout title="Account settings">
      <PageTitle>Account settings</PageTitle>
      <section>
        {settings ? (
          <>
            <EmailNotifications {...settings} />
            <SDK sdkKey={settings.sdkKey || ''} />
            <WebPushNotifications {...settings} />
            <DeleteAccountCard />
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
      logger.error(`Save email settings failed`, error as Error);
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
