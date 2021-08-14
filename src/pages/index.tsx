import ArrowRight from '@geist-ui/react-icons/arrowRight';
import Head from 'next/head';
import * as React from 'react';
import tw, { css } from 'twin.macro';

import { Button } from '$/components/Button';
import { Text } from '$/components/Text/Text';

function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <main tw="min-h-full flex flex-col items-center py-12 space-y-8">
        <h1 tw="font-black text-center text-gray-800 mt-1 w-full max-w-2xl text-4xl leading-snug">
          <span
            tw="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary-500"
            css={css`
              ::selection {
                ${tw`text-gray-800`}
              }
            `}
          >
            {strings.heroTitlePoint}
          </span>{' '}
          <span>{strings.heroTitle}</span>
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
    </>
  );
}

export default Home;

export const strings = {
  heroTitlePoint: 'Open source & privacy friendly',
  heroTitle: 'Disqus alternate',
  heroDescription: 'Access your audience quickly by integrating a modern comment system.',
  callToAction: {
    main: 'Try It Free',
    secondary: 'Learn More',
  },
};
