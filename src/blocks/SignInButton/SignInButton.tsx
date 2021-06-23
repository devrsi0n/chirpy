import Loader from '@geist-ui/react-icons/loader';
import Lock from '@geist-ui/react-icons/lock';
import * as React from 'react';
import 'twin.macro';

import { Button, ButtonProps } from '$/components/Button';
import { useCurrentUser } from '$/components/CurrentUserProvider/useCurrentUser';
import { useSignIn } from '$/hooks/useSignIn';

export type SignInButtonProps = Pick<ButtonProps, 'variant'>;

export function SignInButton({ variant = 'solid' }: SignInButtonProps): JSX.Element {
  const { loading: signInLoading } = useCurrentUser();
  const handleClickSignIn = useSignIn();

  return (
    <Button tw="space-x-1" color="primary" variant={variant} onClick={handleClickSignIn}>
      {signInLoading ? <Loader tw="animate-spin w-5 h-5" /> : <Lock size="14" />}
      <span>Sign in</span>
    </Button>
  );
}
