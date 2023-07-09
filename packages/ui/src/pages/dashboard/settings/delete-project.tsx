import { trpcClient } from '@chirpy-dev/trpc/src/client';
import * as React from 'react';

import {
  Button,
  Dialog,
  IconLoader,
  Text,
  useToast,
} from '../../../components';
import { logger } from '../../../utilities';
import { Card } from './card';

type DeleteProjectProps = {
  domain: string;
  name: string;
};

export function DeleteProject({ domain, name }: DeleteProjectProps) {
  const [showDialog, setShowDialog] = React.useState(false);
  const { mutateAsync: deleteProject, status } =
    trpcClient.project.delete.useMutation();
  const loading = status === 'loading';
  const { showToast } = useToast();
  const utils = trpcClient.useContext();
  const handleClickConfirmDelete = async () => {
    try {
      await deleteProject({
        domain,
      });
      utils.project.all.invalidate();
    } catch (error) {
      logger.error('Delete project failed', { error });
      showToast({
        type: 'error',
        title:
          'We apologize for the inconvenience. It seems that we are experiencing technical difficulties on our end. Please try again later.',
      });
    }
  };
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Delete project</Card.Title>
          <Text variant="secondary">
            Deleting this project will permanently remove all associated data,
            including comments and analytics. This action cannot be undone.
          </Text>
        </Card.Body>
        <Card.Footer>
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
        </Card.Footer>
      </Card>
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
