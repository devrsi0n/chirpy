import { trpc } from '@chirpy-dev/trpc/src/client';
import { signOut, useSession } from 'next-auth/react';
import * as React from 'react';

import { SettingsCard } from '../../blocks';
import { Button, Spinner, Text, TextField, useToast } from '../../components';
import { MUTATION_ERROR } from '../../strings';
import { logger } from '../../utilities';

export function DeleteAccountCard() {
  const { data: session } = useSession();
  const key =
    session?.user.name || session?.user.username || session?.user.email;
  const { showToast } = useToast();
  const { mutateAsync, isLoading } = trpc.settings.deleteAccount.useMutation();

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const input = formData.get('key');
    if (input !== key) {
      showToast({
        type: 'error',
        title: `You must type in ${key} to confirm.`,
      });
      return;
    }
    try {
      await mutateAsync();
      showToast({
        type: 'success',
        title: 'Your account and related data have been deleted, signing out',
      });
      signOut();
    } catch (error) {
      logger.error(`Delete account failed`, error as Error);
      showToast({
        type: 'error',
        title: MUTATION_ERROR,
      });
      throw error;
    }
  };
  return (
    <form onSubmit={handleSave}>
      <SettingsCard>
        <SettingsCard.Header>Delete account</SettingsCard.Header>
        <SettingsCard.Body>
          <Text className="mb-8" variant="secondary">
            Delete your account, including all your projects, comments,
            analytics and related data. Please type in {key} to confirm. This
            action is not reversible, so please continue with caution.
          </Text>
          <TextField name="key" label="Confirm delete" placeholder={key} />
        </SettingsCard.Body>
        <SettingsCard.Footer>
          <Button color="primary" variant="solid" type="submit">
            {isLoading ? (
              <Spinner className="!text-gray-100">Save</Spinner>
            ) : (
              'Save'
            )}
          </Button>
        </SettingsCard.Footer>
      </SettingsCard>
    </form>
  );
}
