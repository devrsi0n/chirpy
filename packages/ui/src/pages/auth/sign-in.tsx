import { useRouter } from 'next/router';
import * as React from 'react';

import { SignInForm, SiteLayout } from '../../blocks';

export function SignInPage(): JSX.Element {
  const router = useRouter();
  return (
    <SiteLayout
      title="Sign in"
      styles={{
        container: `mx-2 md:!mx-0 !py-0`,
      }}
      hideFooter
      hideHeader
    >
      <SignInForm
        title={router.query['onboarding'] ? `You're almost done` : 'Sign in'}
        subtitle={
          router.query['onboarding']
            ? 'Sign-in to continue to create your project'
            : '👋 Welcome! Please enter your details.'
        }
        anonymous={router.query['anonymous'] === 'true'}
      />
    </SiteLayout>
  );
}
