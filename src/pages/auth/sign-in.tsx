import Head from 'next/head';
import * as React from 'react';
import tw from 'twin.macro';

import { SiteLayout } from '$/blocks/Layout';
import { SignIn } from '$/blocks/SignIn';
import { APP_NAME } from '$/lib/constants';

export default function SignInPage(): JSX.Element {
  return (
    <SiteLayout
      styles={{
        container: tw`mx-2 md:(mx-0) py-0`,
      }}
      hideFooter
      hideHeader
    >
      <Head>
        <title>Sign in - {APP_NAME}</title>
      </Head>
      <SignIn title="Welcome 👋" />
    </SiteLayout>
  );
}
