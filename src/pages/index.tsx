import ArrowRight from '@geist-ui/react-icons/arrowRight';
import Head from 'next/head';
import * as React from 'react';
import { css } from 'twin.macro';

import { Button } from '$/components/Button';
import { Layout } from '$/components/Layout';
import { Text } from '$/components/Text/Text';

function Home(): JSX.Element {
  return (
    <Layout noContainer>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <main tw="py-12 space-y-8">
        <h1
          tw="font-black text-center text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-primary-500 mt-1"
          css={css`
            line-height: 1.09;
            font-size: 3.25rem;
            width: 100%;
            @media (min-width: 320px) {
              & {
                line-height: 1.09;
                font-size: 4rem;
              }
            }
            @media (min-width: 640px) {
              & {
                width: 40rem;
              }
            }
          `}
        >
          {strings.heroTitle}
        </h1>
        <Text tw="text-gray-500 text-center dark:text-gray-400">{strings.heroDescription}</Text>
        <div tw="flex justify-center items-center space-x-6">
          <Button variant="solid" color="primary" className="group" tw="space-x-1 hover:shadow-2xl">
            <span>{strings.callToAction.main}</span>
            <ArrowRight
              size="20px"
              tw="inline-block transition transform group-hover:translate-x-1"
            />
          </Button>
          <Button variant="plain">{strings.callToAction.secondary}</Button>
        </div>
      </main>
    </Layout>
  );
}

export default Home;

export const strings = {
  heroTitle: 'Open Source & Privacy Focused Disqus alternate',
  heroDescription: 'Access your audience quickly by integrating a modern comment system.',
  callToAction: {
    main: 'Try It Free',
    secondary: 'Learn More',
  },
};
