import * as React from 'react';

import { SiteLayout } from '$/blocks/layout';
import { SignInForm } from '$/blocks/sign-in-form';

export default function SignInPage(): JSX.Element {
  const [allowAnonymous, setAllowAnonymous] = React.useState(false);
  React.useEffect(() => {
    if (new URL(location.href).searchParams.get('allowAnonymous') === 'true') {
      setAllowAnonymous(true);
    }
  }, []);
  return (
    <SiteLayout
      title="Sign in"
      styles={{
        container: `mx-2 md:mx-0 py-0`,
      }}
      hideFooter
      hideHeader
    >
      <SignInForm
        title="Sign in"
        subtitle="👋 Welcome! Please enter your details."
        allowAnonymous={allowAnonymous}
      />
    </SiteLayout>
  );
}
