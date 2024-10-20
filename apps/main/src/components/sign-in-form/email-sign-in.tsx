import {
  Button,
  EMAIL_REGEXP,
  Link,
  Text,
  TextField,
  useForm,
} from '@chirpy-dev/ui';
import { signIn } from 'next-auth/react';
import * as React from 'react';

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
        callbackUrl: `${location.origin}/auth/redirecting`,
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
          disabled={!!process.env.NEXT_PUBLIC_MAINTENANCE_MODE}
        >
          Continue with email
        </Button>
      </div>
      <Text size="sm" variant="secondary">
        You can sign-in without password by using a temporary Access Code sent
        to your email instead. Learn more about{' '}
        <Link href="/docs/features/privacy-friendly#email-sign-in">
          email sign-in
        </Link>
        .
      </Text>
    </form>
  );
}
