import { GetStaticProps } from 'next';
import * as React from 'react';

import { SignIn } from '$/blocks/SignIn';
import { CommonPageProps } from '$/types/page.type';

export default function SignInPage(): JSX.Element {
  return <SignIn title="Welcome 👋" />;
}

export const getStaticProps: GetStaticProps<CommonPageProps> = () => {
  return {
    props: {
      layoutProps: {
        noHeader: true,
        noFooter: true,
      },
    },
  };
};
