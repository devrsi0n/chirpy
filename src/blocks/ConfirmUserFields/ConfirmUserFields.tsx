import Check from '@geist-ui/react-icons/check';
import Loader from '@geist-ui/react-icons/loader';
import Send from '@geist-ui/react-icons/send';
import { useRouter } from 'next/router';
import * as React from 'react';
import 'twin.macro';

import { Button } from '$/components/Button';
import { Card } from '$/components/Card';
import { Text } from '$/components/Text';
import { TextField } from '$/components/TextField';
import { useToast } from '$/components/Toast';
import { useUpdateUserFieldsMutation } from '$/graphql/generated/user';
import { useForm } from '$/hooks/useForm';
import { sleep } from '$/utilities/time';

import { useCurrentUser } from '../../contexts/CurrentUserProvider/useCurrentUser';

export type ConfirmUserFieldsProps = {
  //
};

export function ConfirmUserFields(/*props: ConfirmUserFieldsProps*/): JSX.Element {
  const { data, loading: isLoadingUser } = useCurrentUser();
  const { register, errors, hasError, handleSubmit, setError, setFields } = useForm<FormFields>({
    defaultValues: {
      email: data.email || '',
      name: data.name || '',
      username: data.username || '',
    },
  });
  React.useEffect(() => {
    if (!isLoadingUser && data.id) {
      setFields({
        email: data.email!,
        name: data.name!,
        username: data.username!,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoadingUser]);
  const [updateUser, { loading }] = useUpdateUserFieldsMutation();
  const [isSaved, setIsSaved] = React.useState(false);
  const router = useRouter();
  const { showToast } = useToast();
  const handleCLickSubmit = handleSubmit(async (fields) => {
    if (!data.id || isSaved) return;
    try {
      await updateUser({
        variables: {
          id: data.id,
          email: fields.email,
          name: fields.name,
          username: fields.username,
        },
      });
    } catch (error: any) {
      if (/duplicate key.+users_username_key/.test(error.message)) {
        setError('username', 'Username already taken');
      } else if (/duplicate key.+users_email_key/.test(error.message)) {
        setError('email', 'Email already taken');
      } else {
        showToast({
          type: 'error',
          title: 'Somethingwent wrong, please try again later.',
        });
      }
      return;
    }
    setIsSaved(true);
    await sleep(1);
    router.push('/dashboard');
  });
  return (
    <Card as="form" tw="py-6 px-12 w-fit rounded shadow-md">
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
            <Text as="small" variant="secondary" tw="block text-sm">
              Used to mention people
            </Text>
          </span>
        }
        errorMessage={errors.username}
      />
      <Button
        tw="space-x-1 w-full"
        onClick={handleCLickSubmit}
        disabled={hasError || loading}
        aria-label="Save"
        variant="solid"
        color="primary"
      >
        {isSaved ? (
          <Check size={20} />
        ) : loading ? (
          <Loader tw="animate-spin text-gray-400" size={20} />
        ) : (
          <Send size={20} />
        )}
        <span>Save</span>
      </Button>
    </Card>
  );
}

type FormFields = {
  email: string;
  name: string;
  username: string;
};
