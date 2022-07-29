import { signIn } from 'next-auth/react';
import * as React from 'react';

import { Button } from '$/components/button';
import { Link } from '$/components/link';
import { Text } from '$/components/text';
import { TextField } from '$/components/text-field';
import { useForm } from '$/hooks/use-form';

export function AnonymousUserSignIn(): JSX.Element {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      name: '',
    },
  });
  const handleClickSubmit = handleSubmit<React.FormEvent<HTMLFormElement>>(
    async (fields, event) => {
      event.preventDefault();
      await signIn('credentials', {
        // redirect: false,
        callbackUrl: '/dashboard',
        ...fields,
      });
    },
  );

  return (
    <form onSubmit={handleClickSubmit} className="space-y-4">
      <TextField
        {...register('name', {
          pattern: {
            value: /^[\w ]{3,32}$/,
            message:
              'Name can only have alphabet, number, _ or empty space, and it must be 3-32 characters long',
          },
        })}
        errorMessage={errors?.name}
        type="text"
        label="Name"
        className="w-full"
        placeholder="James Smith"
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
