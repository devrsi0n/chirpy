import { ROUTER_ERROR_DUPLICATED_SITE_SUBDOMAIN } from '@chirpy-dev/utils';
import * as React from 'react';

import { Button, Dialog } from '../../../components';
import { useForm } from '../../../hooks';
import { isTRPCClientError, trpcClient } from '../../../utilities';
import { CreateSiteForm } from './create-site-form';

export type CreateSiteDialogProps = {
  show: boolean;
  onDismiss: () => void;
  onSubmit: () => void;
};

type FormFields = {
  name: string;
  subdomain: string;
  description: string;
};

export function CreateSiteDialog(props: CreateSiteDialogProps): JSX.Element {
  const { mutateAsync: createSite } = trpcClient.site.create.useMutation();
  const { register, errors, handleSubmit, hasError, setError } =
    useForm<FormFields>({
      defaultValues: {
        name: '',
        subdomain: '',
        description: '',
      },
    });
  const handleClickSubmit = handleSubmit(
    async (fields, _event: unknown): Promise<void> => {
      try {
        await createSite({
          name: fields.name,
          subdomain: fields.subdomain,
          description: fields.description,
        });
      } catch (error: unknown) {
        if (
          isTRPCClientError(error) &&
          error.message === ROUTER_ERROR_DUPLICATED_SITE_SUBDOMAIN
        ) {
          setError('subdomain', 'This subdomain already exists');
        }
        throw error;
      }
      props.onSubmit();
    },
  );
  return (
    <Dialog show={props.show} title="New blog site" onClose={props.onDismiss}>
      <Dialog.Body>
        <CreateSiteForm register={register} errors={errors} />
      </Dialog.Body>
      <Dialog.Footer>
        <Button onClick={props.onDismiss} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button
          className="w-full sm:w-auto"
          disabled={hasError}
          color="primary"
          variant="solid"
          onClick={handleClickSubmit}
        >
          Create
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
}
