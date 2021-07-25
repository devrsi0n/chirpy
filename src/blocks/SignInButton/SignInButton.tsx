import Loader from '@geist-ui/react-icons/loader';
import Lock from '@geist-ui/react-icons/lock';
import { signIn } from 'next-auth/client';
import * as React from 'react';
import 'twin.macro';

import { useCurrentUser } from '$/blocks/CurrentUserProvider/useCurrentUser';
import { Button, ButtonProps } from '$/components/Button';

export type SignInButtonProps = Pick<ButtonProps, 'variant'> & {
  inPageNav: boolean;
};

export function SignInButton({ variant = 'solid' }: SignInButtonProps): JSX.Element {
  const { loading: signInLoading } = useCurrentUser();

  return (
    <Button color="primary" variant={variant} onClick={() => signIn()}>
      <span tw="inline-flex flex-row items-center space-x-1">
        {signInLoading ? <Loader tw="animate-spin w-5 h-5" /> : <Lock size="14" />}
        <span>Sign in</span>
      </span>
    </Button>
  );
}
