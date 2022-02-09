import Loader from '@geist-ui/react-icons/loader';
import Lock from '@geist-ui/react-icons/lock';
import { signIn } from 'next-auth/react';
import * as React from 'react';
import 'twin.macro';

import { Button, ButtonProps } from '$/components/button';
import { useCurrentUser } from '$/contexts/current-user-context/use-current-user';
import { useSignInWindow } from '$/hooks/use-sign-in-window';
import { PREV_PATH } from '$/lib/constants';

export type SignInButtonProps = Pick<ButtonProps, 'variant' | 'size'> & {
  inPageNav?: boolean;
};

const handleSessionAndSignIn = () => {
  sessionStorage.setItem(PREV_PATH, location.pathname);
  signIn();
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
      onClick={() => (!inPageNav ? handleSignIn() : handleSessionAndSignIn())}
      {...restProps}
    >
      <span tw="inline-flex flex-row items-center space-x-1">
        {signInLoading ? <Loader tw="animate-spin w-5 h-5" /> : <Lock size="14" />}
        <span>Sign in</span>
      </span>
    </Button>
  );
}
