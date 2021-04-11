import Lock from '@geist-ui/react-icons/lock';
import * as React from 'react';
import 'twin.macro';

import { Button, ButtonProps } from '$/components/Button';
import { SpinnerIcon } from '$/components/Icons';
import { useCurrentUser } from '$/hooks/useCurrentUser';
import { useSignIn } from '$/hooks/useSignIn';

export type SignInButtonProps = Pick<ButtonProps, 'variant'>;

export function SignInButton({ variant = 'solid' }: SignInButtonProps): JSX.Element {
  const { loading: signInLoading } = useCurrentUser();
  const handleClickSignIn = useSignIn();

  return (
    <Button tw="space-x-1" color="purple" variant={variant} onClick={handleClickSignIn}>
      {signInLoading ? <SpinnerIcon tw="text-gray-400" /> : <Lock size="14" />}
      <span>Sign in</span>
    </Button>
  );
}
