import * as React from 'react';

import { SiteLayout } from '$/blocks/layout';
import { SignInForm } from '$/blocks/sign-in-form';

export default function SignInPage(): JSX.Element {
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
      />
    </SiteLayout>
  );
}
