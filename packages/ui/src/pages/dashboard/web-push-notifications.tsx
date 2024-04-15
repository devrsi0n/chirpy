import { Settings } from '@chirpy-dev/trpc';
import { trpc } from '@chirpy-dev/trpc/src/client';
import * as React from 'react';

import { SettingsCard } from '../../blocks';
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

type WebPushForm = Pick<
  Settings,
  'webPushReceipt' | 'webPushReply' | 'webPushUsage'
>;
export function WebPushNotifications(props: WebPushForm) {
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
      logger.error(`Save web push settings failed`, error as Error);
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
        <Text className="-mt-2" variant="secondary">
          {`What's `}
          <Link variant="primary" href="/docs/features/notifications#web-push">
            web push
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
            <Spinner className="!text-gray-100">Saving</Spinner>
          ) : (
            'Save'
          )}
        </Button>
      </SettingsCard.Footer>
    </SettingsCard>
  );
}
