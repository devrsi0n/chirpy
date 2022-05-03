import Loader from '@geist-ui/react-icons/loader';
import Lock from '@geist-ui/react-icons/lock';
import { signIn } from 'next-auth/react';
import * as React from 'react';

import { Button, ButtonProps } from '@chirpy/components';
import { useCurrentUser } from '@chirpy/contexts';
import { useSignInWindow } from '@chirpy/hooks';
import { CALLBACK_URL_KEY } from '@chirpy/utilities';

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
      onClick={() => (!inPageNav ? handleSignIn() : handleSessionAndSignIn())}
      {...restProps}
    >
      <span className="inline-flex flex-row items-center space-x-1">
        {signInLoading ? (
          <Loader aria-label="Signing in" className="animate-spin w-5 h-5" />
        ) : (
          <Lock size="14" />
        )}
        <span>Sign in</span>
      </span>
    </Button>
  );
}
