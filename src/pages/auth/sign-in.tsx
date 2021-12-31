import { GetStaticProps } from 'next';
import Head from 'next/head';
import * as React from 'react';
import tw from 'twin.macro';

import { SignIn } from '$/blocks/SignIn';
import { APP_NAME } from '$/lib/constants';
import { CommonPageProps } from '$/types/page.type';

export default function SignInPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Sign in - {APP_NAME}</title>
      </Head>
      <SignIn title="Welcome 👋" />
    </>
  );
}

export const getStaticProps: GetStaticProps<CommonPageProps> = async () => {
  return {
    props: {
      layoutProps: {
        styles: {
          container: tw`mx-2 md:(mx-0) py-0`,
        },
        hideFooter: true,
        hideHeader: true,
      },
    },
  };
};
