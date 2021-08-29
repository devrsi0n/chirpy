import Loader from '@geist-ui/react-icons/loader';
import Lock from '@geist-ui/react-icons/lock';
import { signIn } from 'next-auth/client';
import * as React from 'react';
import 'twin.macro';

import { useCurrentUser } from '$/blocks/CurrentUserProvider/useCurrentUser';
import { Button, ButtonProps } from '$/components/Button';
import { useSignIn } from '$/hooks/useSignIn';

export type SignInButtonProps = Pick<ButtonProps, 'variant'> & {
  inPageNav?: boolean;
};

export function SignInButton({ variant = 'solid', inPageNav }: SignInButtonProps): JSX.Element {
  const { loading: signInLoading } = useCurrentUser();
  const handleSignIn = useSignIn();
  return (
    <Button
      color="primary"
      variant={variant}
      onClick={() => (!inPageNav ? handleSignIn() : signIn())}
    >
      <span tw="inline-flex flex-row items-center space-x-1">
        {signInLoading ? <Loader tw="animate-spin w-5 h-5" /> : <Lock size="14" />}
        <span>Sign in</span>
      </span>
    </Button>
  );
}
