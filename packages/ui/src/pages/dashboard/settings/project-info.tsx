import { trpc } from '@chirpy-dev/trpc/src/client';
import * as React from 'react';

import { SettingsCard } from '../../../blocks';
import { Button, Spinner, TextField, useToast } from '../../../components';
import { useForm } from '../../../hooks';
import { MUTATION_ERROR } from '../../../strings';
import { isValidDomain, logger } from '../../../utilities';

export type ProjectInfoProps = {
  id: string;
  name: string;
  domain: string;
  username: string;
};

type FormFields = {
  name: string;
  domain: string;
};

export function ProjectInfo(props: ProjectInfoProps): JSX.Element {
  const { isLoading, mutateAsync } = trpc.project.update.useMutation();
  const { showToast } = useToast();
  const { register, errors, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      name: props.name,
      domain: props.domain,
    },
  });
  const { mutateAsync: revalidate } = trpc.revalidate.url.useMutation();
  const handleSave = handleSubmit(async (fields): Promise<void> => {
    try {
      await mutateAsync({
        projectId: props.id,
        name: fields.name,
        domain: fields.domain,
      });
      showToast({
        type: 'success',
        title: 'Page info updated',
      });
      void revalidate({
        url: `/dashboard/${props.username}/${props.domain}/settings`,
      });
    } catch (error) {
      showToast({
        type: 'error',
        title: MUTATION_ERROR,
      });
      logger.error('Update project info failed', error as Error);
    }
  });
  return (
    <SettingsCard>
      <SettingsCard.Header>Basic info</SettingsCard.Header>
      <SettingsCard.Body>
        <TextField
          {...register('name', {
            required: { value: true, message: 'Name is required' },
            pattern: {
              value: /^\w+$/,
              message: `Only word characters are allowed`,
            },
            minLength: { value: 1, message: 'At least 1 characters' },
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
          hintText="Please create a new project if you need to change the domain"
          errorMessage={errors.domain}
          placeholder="example.com"
          className="w-full"
          disabled
        />
      </SettingsCard.Body>
      <SettingsCard.Footer>
        <Button variant="solid" color="primary" onClick={handleSave}>
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
