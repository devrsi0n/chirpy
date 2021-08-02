import { Send } from '@geist-ui/react-icons';
import Loader from '@geist-ui/react-icons/loader';
import { useRouter } from 'next/router';
import * as React from 'react';
import 'twin.macro';

import { Button } from '$/components/Button';
import { TextField } from '$/components/TextField';
import { useToast } from '$/components/Toast';
import { useUpdateUserFieldsMutation } from '$/graphql/generated/user';
import { useForm } from '$/hooks/useForm';
import { sleep } from '$/utilities/time';

import { useCurrentUser } from '../CurrentUserProvider/useCurrentUser';

export type ConfirmUserFieldsProps = {
  //
};

export function ConfirmUserFields(/*props: ConfirmUserFieldsProps*/): JSX.Element {
  const { data } = useCurrentUser();
  const { register, errors, hasError, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      email: data.email || '',
      name: data.name || '',
      username: data.username || '',
    },
  });
  const [updateUser, { loading }] = useUpdateUserFieldsMutation();
  const { showToast } = useToast();
  const router = useRouter();
  const handleCLickSubmit = handleSubmit(async (fields) => {
    if (!data.id) return;
    try {
      await updateUser({
        variables: {
          id: data.id,
          email: fields.email,
          name: fields.name,
          username: fields.username,
        },
      });
    } catch {
      // TODO: Make a clear error message
      showToast({
        type: 'error',
        title: 'Try another email or username!',
      });
      return;
    }
    showToast({
      type: 'success',
      title: 'Thanks, your profile saved!',
    });
    await sleep(2.5);
    router.push('/dashboard');
  });
  return (
    <form tw="py-6 px-12 w-fit bg-white rounded shadow-md">
      <TextField
        {...register('email', {
          required: { value: true, message: 'Email is required' },
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: `Invalid email`,
          },
        })}
        type="email"
        label="Your email"
        errorMessage={errors.email}
      />
      <TextField
        {...register('name', {
          required: { value: true, message: 'Dispaly name is required' },
        })}
        label="Your dispaly name"
        errorMessage={errors.name}
      />
      <TextField
        {...register('username', {
          required: { value: true, message: 'ID is required' },
          pattern: {
            value: /^\w+$/,
            message: `Only word characters are allowed`,
          },
          minLength: { value: 3, message: 'At least 3 characters' },
          maxLength: { value: 16, message: 'At most 16 characters' },
        })}
        label={
          <span>
            Your username
            <small tw="block text-gray-400 text-sm">Used to at people</small>
          </span>
        }
        errorMessage={errors.username}
      />
      <Button
        tw="space-x-1 w-full"
        onClick={handleCLickSubmit}
        disabled={hasError}
        aria-label="Save"
        variant="solid"
        color="primary"
      >
        {loading ? <Loader tw="animate-spin text-gray-400 w-5 h-5" /> : <Send size="14" />}
        <span>Save</span>
      </Button>
    </form>
  );
}

type FormFields = {
  email: string;
  name: string;
  username: string;
};
