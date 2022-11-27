import { CALLBACK_URL_KEY } from '@chirpy-dev/utils';
import { signIn } from 'next-auth/react';
import * as React from 'react';

import { Button, ButtonProps, IconLoader, IconLock } from '../../components';
import { useCurrentUser } from '../../contexts/current-user-context';
import { useSignInWindow } from '../../hooks/use-sign-in-window';

export type SignInButtonProps = Pick<ButtonProps, 'variant' | 'size'> & {
  inPageNav?: boolean;
};

const handleSessionAndSignIn = () => {
  sessionStorage.setItem(CALLBACK_URL_KEY, location.pathname);
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
      onClick={() => (inPageNav ? handleSessionAndSignIn() : handleSignIn())}
      {...restProps}
    >
      <span className="inline-flex flex-row items-center space-x-1">
        {signInLoading ? (
          <IconLoader
            aria-label="Signing in"
            className="h-5 w-5 animate-spin"
          />
        ) : (
          <IconLock size="14" />
        )}
        <span>Sign in</span>
      </span>
    </Button>
  );
}
