import { isValidDomain } from '@chirpy-dev/utils';
import * as React from 'react';

import { Button, Dialog, TextField } from '../../components';
import { useForm } from '../../hooks';
import { trpcClient } from '../../utilities';

export type CreateProjectDialogProps = {
  show: boolean;
  onDismiss: () => void;
  onSubmit: () => void;
};

type FormFields = {
  name: string;
  domain: string;
};

export function CreateProjectDialog(
  props: CreateProjectDialogProps,
): JSX.Element {
  const { mutateAsync: createAProject } =
    trpcClient.project.create.useMutation();
  const { register, errors, handleSubmit, hasError, setError } =
    useForm<FormFields>({
      defaultValues: {
        name: '',
        domain: '',
      },
    });
  const handleClickSubmit = handleSubmit(
    async (fields, _event: unknown): Promise<void> => {
      try {
        await createAProject({
          name: fields.name,
          domain: fields.domain,
        });
      } catch (error: any) {
        if (error?.message?.includes('Unique constraint')) {
          setError('domain', 'A project associated with this domain already');
          return;
        }
        throw error;
      }
      props.onSubmit();
    },
  );
  return (
    <Dialog
      show={props.show}
      title="New comment project"
      onClose={props.onDismiss}
    >
      <Dialog.Body>
        <form className="flex w-80 flex-col space-y-4">
          <TextField
            {...register('name', {
              required: { value: true, message: 'Name is required' },
              pattern: {
                value: /^\w+$/,
                message: `Only word characters are allowed`,
              },
              minLength: { value: 3, message: 'At least 3 characters' },
              maxLength: { value: 16, message: 'At most 16 characters' },
            })}
            aria-label="Name of this project"
            label="Name"
            errorMessage={errors.name}
            placeholder="swift"
            className="w-full"
          />
          <TextField
            {...register('domain', {
              required: { value: true, message: 'Domain is required' },
              pattern: {
                value: isValidDomain,
                message: 'Invalid domain',
              },
            })}
            label="Domain"
            hintText="Associate your domain with this project"
            errorMessage={errors.domain}
            placeholder="example.com"
            className="w-full"
          />
        </form>
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
