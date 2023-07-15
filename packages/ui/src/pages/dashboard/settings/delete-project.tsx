import { trpc } from '@chirpy-dev/trpc/src/client';
import { useRouter } from 'next/router';
import * as React from 'react';

import { SettingsCard } from '../../../blocks';
import {
  Button,
  Dialog,
  IconLoader,
  Text,
  useToast,
} from '../../../components';
import { MUTATION_ERROR } from '../../../strings';
import { logger } from '../../../utilities';

type DeleteProjectProps = {
  domain: string;
  name: string;
  username: string;
};

export function DeleteProject({ domain, name, username }: DeleteProjectProps) {
  const [showDialog, setShowDialog] = React.useState(false);
  const { mutateAsync: deleteProject, status } =
    trpc.project.delete.useMutation();
  const loading = status === 'loading';
  const { showToast } = useToast();
  const { mutateAsync: revalidate } = trpc.revalidate.url.useMutation();
  const router = useRouter();
  const handleClickConfirmDelete = async () => {
    try {
      await deleteProject({
        domain,
      });
      setShowDialog(false);
      showToast({
        type: 'success',
        title: 'Project deleted',
      });
      await revalidate({
        url: `/dashboard/${username}`,
      });
      router.push(`/dashboard/${username}`);
    } catch (error) {
      logger.error('Delete project failed', { error });
      showToast({
        type: 'error',
        title: MUTATION_ERROR,
      });
    }
  };
  return (
    <>
      <SettingsCard>
        <SettingsCard.Header>Delete project</SettingsCard.Header>
        <SettingsCard.Body>
          <Text variant="secondary">
            Deleting this project will permanently remove all associated data,
            including comments and analytics. This action cannot be undone.
          </Text>
        </SettingsCard.Body>
        <SettingsCard.Footer>
          <Button
            variant="solid"
            color="red"
            onClick={() => {
              setShowDialog(true);
            }}
            disabled={!!process.env.NEXT_PUBLIC_MAINTENANCE_MODE}
          >
            Delete
          </Button>
        </SettingsCard.Footer>
      </SettingsCard>
      <Dialog
        type="alert"
        title={`Delete project ${name}`}
        show={showDialog}
        onClose={() => setShowDialog(false)}
      >
        <Dialog.Body>
          <Text>
            Are you sure you want to delete this project? All associated data,
            including comments and analytics, will be permanently deleted.
          </Text>
        </Dialog.Body>
        <Dialog.Footer>
          <Button onClick={() => setShowDialog(false)}>Cancel</Button>
          <Button
            variant="solid"
            color="red"
            onClick={handleClickConfirmDelete}
          >
            {loading ? <IconLoader /> : 'Delete'}
          </Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
}
