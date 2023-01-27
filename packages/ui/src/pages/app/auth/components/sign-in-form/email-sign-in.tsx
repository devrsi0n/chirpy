import { EMAIL_RE } from '@chirpy-dev/utils';
import { signIn } from 'next-auth/react';
import * as React from 'react';

import { Input } from '../../../../../components';
import { Button } from '../../../../../components/button';
import { FormField } from '../../../../../components/form-field';
import { Link } from '../../../../../components/link';
import { Text } from '../../../../../components/text';
import { useForm } from '../../../../../hooks/use-form';
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
        callbackUrl: `${location.origin}/redirecting`,
      });
    },
  );

  return (
    <form onSubmit={handleClickSubmit} className="space-y-4">
      <FormField
        {...register('email', {
          pattern: {
            value: EMAIL_RE,
            message: 'Invalid email address',
          },
        })}
        errorMessage={errors?.email}
        label="Email"
      >
        <Input placeholder="james@example.com" />
      </FormField>
      <div>
        {children}
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={!!process.env.NEXT_PUBLIC_MAINTENANCE_MODE}
        >
          Continue with email
        </Button>
      </div>
      <Text size="sm" variant="secondary">
        You can sign-in without password by using a temporary Access Code sent
        to your email instead. Learn more about{' '}
        <Link
          origin="home"
          href="/docs/features/privacy-friendly#email-sign-in"
        >
          email sign-in
        </Link>
        .
      </Text>
    </form>
  );
}
