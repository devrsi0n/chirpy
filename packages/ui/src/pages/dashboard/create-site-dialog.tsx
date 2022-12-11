import * as React from 'react';

import { Button, Dialog, TextArea, TextField } from '../../components';
import { useForm } from '../../hooks';
import { trpcClient } from '../../utilities';

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
      } catch (error: any) {
        if (error?.message?.includes('Unique constraint')) {
          setError(
            'subdomain',
            'A project associated with this domain already',
          );
          return;
        }
        throw error;
      }
      props.onSubmit();
    },
  );
  return (
    <Dialog show={props.show} title="New blog site" onClose={props.onDismiss}>
      <Dialog.Body>
        <form className="flex w-80 flex-col space-y-4">
          <TextField
            {...register('name', {
              required: { value: true, message: 'Name is required' },
              maxLength: { value: 64, message: 'At most 64 characters' },
            })}
            aria-label="Name of this site"
            label="Name"
            errorMessage={errors.name}
            placeholder="blog"
            className="w-full"
          />
          <TextField
            {...register('subdomain', {
              required: { value: true, message: 'Subdomain is required' },
              pattern: {
                value: /^[A-Za-z]+$/,
                message: `Only word characters are allowed`,
              },
            })}
            suffix=".chirpy.dev"
            label="Subdomain"
            errorMessage={errors.subdomain}
            placeholder="blog"
            className="w-full"
          />
          <TextArea
            {...register('description', {
              maxLength: { value: 190, message: 'At most 190 characters' },
            })}
            aria-label="description of this site"
            label="Description"
            errorMessage={errors.description}
            placeholder="My blog"
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
