import { signIn } from 'next-auth/react';
import * as React from 'react';

import { Button } from '$/components/button';
import { Link } from '$/components/link';
import { Text } from '$/components/text';
import { TextField } from '$/components/text-field';
import { useForm } from '$/hooks/use-form';

/**
 * Email sign-in
 */
export function EmailSignIn(): JSX.Element {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      email: '',
    },
  });
  const handleClickSubmit = handleSubmit<React.FormEvent<HTMLFormElement>>(
    async (fields, event) => {
      event.preventDefault();
      await signIn('email', {
        // redirect: false,
        callbackUrl: '/dashboard',
        ...fields,
      });
    },
  );

  return (
    <form onSubmit={handleClickSubmit} className="space-y-4">
      <TextField
        {...register('email', {
          pattern: {
            value: /^[\w ]{3,24}$/,
            message:
              'Name can only have alphabet, number, _ or empty space, and it must be 3-24 characters long',
          },
        })}
        errorMessage={errors?.email}
        type="text"
        label="Email"
        className="w-full"
        placeholder="james@example.com"
      />
      <Button type="submit" variant="solid" color="primary" className="w-full">
        Continue as anonymous user
      </Button>
      <Text size="sm" variant="secondary">
        You can connect an email later, or stay anonymous as long as you like.
        Learn more about{' '}
        <Link href="/docs/features/privacy-friendly#anonymous-login">
          anonymous login
        </Link>
        .
      </Text>
    </form>
  );
}
