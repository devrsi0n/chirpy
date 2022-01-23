import Loader from '@geist-ui/react-icons/loader';
import Lock from '@geist-ui/react-icons/lock';
import { signIn } from 'next-auth/react';
import * as React from 'react';
import 'twin.macro';

import { Button, ButtonProps } from '$/components/button';
import { useCurrentUser } from '$/contexts/current-user-provider/useCurrentUser';
import { useSignInWindow } from '$/hooks/useSignInWindow';

export type SignInButtonProps = Pick<ButtonProps, 'variant' | 'size'> & {
  inPageNav?: boolean;
};

export function SignInButton({
  variant = 'solid',
  inPageNav,
  ...restProps
}: SignInButtonProps): JSX.Element {
  const { loading: signInLoading } = useCurrentUser();
  const handleSignIn = useSignInWindow();
  return (
    <Button
      color="primary"
      variant={variant}
      onClick={() => (!inPageNav ? handleSignIn() : signIn())}
      {...restProps}
    >
      <span tw="inline-flex flex-row items-center space-x-1">
        {signInLoading ? <Loader tw="animate-spin w-5 h-5" /> : <Lock size="14" />}
        <span>Sign in</span>
      </span>
    </Button>
  );
}
