import * as React from 'react';

import { SiteLayout } from '$/blocks/layout';
import { SignIn } from '$/blocks/sign-in';

export default function SignInPage(): JSX.Element {
  return (
    <SiteLayout
      title="Sign in"
      styles={{
        container: `mx-2 md:(mx-0) py-0`,
      }}
      hideFooter
      hideHeader
    >
      <SignIn title="Welcome 👋" />
    </SiteLayout>
  );
}
