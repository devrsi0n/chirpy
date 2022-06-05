import { useRouter } from 'next/router';
import * as React from 'react';

import { Button } from '$/components/button';
import { Card } from '$/components/card';
import { IconCheck, IconLoader, IconSend } from '$/components/icons';
import { Text } from '$/components/text';
import { TextField } from '$/components/text-field';
import { useToast } from '$/components/toast';
import { useCurrentUser } from '$/contexts/current-user-context';
import { useUpdateUserFieldsMutation } from '$/graphql/generated/user';
import { useForm } from '$/hooks/use-form';
import { sleep } from '$/utilities/time';

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
        email: data.email || '',
        name: data.name || '',
        username: data.username || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoadingUser]);
  const [{ fetching: loading }, updateUser] = useUpdateUserFieldsMutation();
  const [isSaved, setIsSaved] = React.useState(false);
  const router = useRouter();
  const { showToast } = useToast();
  const handleClickSubmit = handleSubmit<React.MouseEvent<HTMLButtonElement>>(async (fields) => {
    if (!data.id || isSaved) return;
    try {
      await updateUser({
        id: data.id,
        email: fields.email,
        name: fields.name,
        username: fields.username,
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
    <Card as="form" className="w-fit rounded py-6 px-12 shadow-md">
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
            <Text as="small" variant="secondary" className="block text-sm">
              Used to be mentioned by people
            </Text>
          </span>
        }
        errorMessage={errors.username}
      />
      <Button
        className="w-full space-x-1"
        onClick={handleClickSubmit}
        disabled={hasError || loading}
        aria-label="Save"
        variant="solid"
        color="primary"
      >
        {isSaved ? (
          <IconCheck size={20} />
        ) : loading ? (
          <IconLoader className="animate-spin text-gray-400" size={20} />
        ) : (
          <IconSend size={20} />
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
