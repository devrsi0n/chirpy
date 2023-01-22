import * as React from 'react';

import { AuthLayout } from './components/auth-layout';
import { SignInForm } from './components/sign-in-form';

export function SignInPage(): JSX.Element {
  const [allowAnonymous, setAllowAnonymous] = React.useState(false);
  React.useEffect(() => {
    if (new URL(location.href).searchParams.get('allowAnonymous') === 'true') {
      setAllowAnonymous(true);
    }
  }, []);
  return (
    <AuthLayout title="Sign in" className="mx-2 py-0 md:mx-0">
      <SignInForm
        title="Sign in"
        subtitle="👋 Welcome! Please enter your details."
        allowAnonymous={allowAnonymous}
      />
    </AuthLayout>
  );
}
