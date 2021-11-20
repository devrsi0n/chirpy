import { GetStaticProps } from 'next';
import * as React from 'react';
import tw from 'twin.macro';

import { SignIn } from '$/blocks/SignIn';
import { CommonPageProps } from '$/types/page.type';

export default function SignInPage(): JSX.Element {
  return <SignIn title="Welcome 👋" />;
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
