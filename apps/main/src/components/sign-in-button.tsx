import {
  Button,
  ButtonProps,
  IconLoader,
  IconLock,
  useSignInWindow,
} from '@chirpy-dev/ui';
import { CALLBACK_URL_KEY } from '@chirpy-dev/utils';
import { signIn } from 'next-auth/react';
import * as React from 'react';

import { useCurrentUser } from '$/contexts';

export type SignInButtonProps = Pick<ButtonProps, 'variant' | 'size'> & {
  inPageNav?: boolean;
  children?: React.ReactNode;
};

const handleSessionAndSignIn = () => {
  sessionStorage.setItem(CALLBACK_URL_KEY, location.pathname);
  signIn();
};

export function SignInButton({
  variant = 'solid',
  inPageNav,
  children,
  ...restProps
}: SignInButtonProps): JSX.Element {
  const { loading: signInLoading } = useCurrentUser();
  const handleSignIn = useSignInWindow();
  const defaultChildren = (
    <>
      {signInLoading ? (
        <IconLoader aria-label="Signing in" className="h-5 w-5 animate-spin" />
      ) : (
        <IconLock size="14" />
      )}
      <span>Sign in</span>
    </>
  );
  return (
    <Button
      color="primary"
      variant={variant}
      onClick={() => (inPageNav ? handleSessionAndSignIn() : handleSignIn())}
      {...restProps}
      disabled={!!process.env.NEXT_PUBLIC_MAINTENANCE_MODE}
    >
      <span className="inline-flex flex-row items-center space-x-1">
        {children || defaultChildren}
      </span>
    </Button>
  );
}
