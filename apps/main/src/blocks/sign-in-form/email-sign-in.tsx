import { signIn } from 'next-auth/react';
import * as React from 'react';

import { Button } from '$/components/button';
import { Text } from '$/components/text';
import { TextField } from '$/components/text-field';
import { useForm } from '$/hooks/use-form';
import { EMAIL_REGEXP } from '$/utilities/validator';

import { SignInProps } from './types';

/**
 * Email/magic link sign-in
 */
export function EmailSignIn({ children }: SignInProps): JSX.Element {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      email: '',
    },
  });
  const handleClickSubmit = handleSubmit<React.FormEvent<HTMLFormElement>>(
    async (fields, event) => {
      event.preventDefault();
      await signIn('email', {
        ...fields,
        callbackUrl: '/dashboard',
      });
    },
  );

  return (
    <form onSubmit={handleClickSubmit} className="space-y-4">
      <TextField
        {...register('email', {
          pattern: {
            value: EMAIL_REGEXP,
            message: 'Invalid email address',
          },
        })}
        errorMessage={errors?.email}
        type="text"
        label="Email"
        className="w-full"
        placeholder="james@example.com"
      />
      <div>
        {children}
        <Button
          type="submit"
          variant="solid"
          color="primary"
          className="w-full"
        >
          Continue with email
        </Button>
      </div>
      <Text size="sm" variant="secondary">
        You can sign-in without password by using a temporary Access Code sent
        to your email instead.
      </Text>
    </form>
  );
}
