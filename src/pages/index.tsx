import ArrowRight from '@geist-ui/react-icons/arrowRight';
import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { Features } from '$/blocks/Features';
import { Pricing } from '$/blocks/Pricing';
import { Button } from '$/components/Button';
import { Link } from '$/components/Link';
import { Text } from '$/components/Text';
import { gradient } from '$/styles/common';

function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <section tw="min-h-full flex flex-col items-center space-y-24">
        <div tw="space-y-8">
          <h1 tw="font-black sm:(text-center) text-gray-1200 mt-1 w-full max-w-2xl text-4xl leading-snug">
            <span tw="text-transparent bg-clip-text" css={gradient}>
              {strings.heroTitlePoint}
            </span>{' '}
            <span>{strings.heroTitle}</span>
          </h1>
          <Text tw="sm:text-center" variant="secondary">
            {strings.heroDescription}
          </Text>
          <div tw="flex sm:justify-center items-center space-x-6">
            <Link variant="plain" href="/auth/sign-in" tabIndex={-1}>
              <Button
                variant="solid"
                color="primary"
                className="group"
                tw="space-x-1 hover:shadow-2xl"
              >
                <span>{strings.callToAction.main}</span>
                <ArrowRight
                  size="20px"
                  tw="inline-block transition transform group-hover:translate-x-1"
                />
              </Button>
            </Link>
            <Link variant="plain" href="/docs/index" tabIndex={-1}>
              <Button>{strings.callToAction.secondary}</Button>
            </Link>
          </div>
        </div>
        <Features />
        <Pricing id="pricing" />
      </section>
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
