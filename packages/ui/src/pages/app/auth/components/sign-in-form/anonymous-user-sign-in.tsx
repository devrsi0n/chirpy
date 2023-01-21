import { signIn } from 'next-auth/react';
import * as React from 'react';

import { Button } from '../../../../../components/button';
import { Link } from '../../../../../components/link';
import { Text } from '../../../../../components/text';
import { TextField } from '../../../../../components/text-field';
import { useForm } from '../../../../../hooks/use-form';
import { SignInProps } from './types';

export function AnonymousUserSignIn({ children }: SignInProps): JSX.Element {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      name: '',
    },
  });
  const handleClickSubmit = handleSubmit<React.FormEvent<HTMLFormElement>>(
    async (fields, event) => {
      event.preventDefault();
      await signIn('credentials', {
        ...fields,
        callbackUrl: `${location.origin}/redirecting`,
      });
    },
  );

  return (
    <form onSubmit={handleClickSubmit} className="space-y-4">
      <TextField
        {...register('name', {
          pattern: {
            value: /^[\w ]{3,24}$/,
            message:
              'Name can only have alphabets, numbers, _ or empty spaces, and it must be 3-24 characters long',
          },
        })}
        errorMessage={errors?.name}
        type="text"
        label="Name"
        placeholder="James Smith"
      />
      <div>
        {children}
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={!!process.env.NEXT_PUBLIC_MAINTENANCE_MODE}
        >
          Continue as anonymous user
        </Button>
      </div>
      <Text size="sm" variant="secondary">
        You can connect an email later, or stay anonymous as long as you like.
        Learn more about{' '}
        <Link
          origin="home"
          href="/docs/features/privacy-friendly#anonymous-sign-in"
        >
          anonymous sign-in
        </Link>
        .
      </Text>
    </form>
  );
}
