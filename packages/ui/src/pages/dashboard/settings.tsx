import { trpcClient } from '@chirpy-dev/trpc/src/client';
import * as React from 'react';

import { PageTitle, SiteLayout } from '../../blocks';
import {
  Button,
  Dialog,
  Heading,
  IconLoader,
  Text,
  useToast,
} from '../../components';
import { logger } from '../../utilities';

export type ProjectSettingsProps = {
  domain: string;
  name: string;
};

export function ProjectSettings({
  domain,
  name,
}: ProjectSettingsProps): JSX.Element {
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
    <SiteLayout title="Project settings">
      <PageTitle>Project settings, {name}</PageTitle>
      <section className="mt-10 rounded border">
        <div className="space-y-3 p-5">
          <Heading as="h3" className="font-medium">
            Delete project
          </Heading>
          <Text variant="secondary">
            Deleting this project will permanently remove all associated data,
            including comments and analytics. This action cannot be undone.
          </Text>
        </div>
        <footer className="flex justify-end border-t bg-gray-300 px-5 py-3">
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
        </footer>
      </section>
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
    </SiteLayout>
  );
}
