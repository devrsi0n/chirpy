import ArrowRight from '@geist-ui/react-icons/arrowRight';
import * as React from 'react';
import 'twin.macro';

import { Features } from '$/blocks/features';
import { SiteLayout } from '$/blocks/layout';
import { Pricing } from '$/blocks/pricing';
import { Button } from '$/components/button';
import { Link } from '$/components/link';
import { Text } from '$/components/text';

function Home(): JSX.Element {
  return (
    <SiteLayout enableBgGradient title="">
      <section tw="min-h-full flex flex-col items-center space-y-24">
        <div tw="space-y-8">
          <h1 tw="font-black sm:(text-center) text-gray-1200 mt-1 w-full max-w-2xl text-4xl leading-snug">
            <span tw="text-transparent bg-clip-text bg-gradient-to-r from-primary-900 to-plum-900 inline-block">
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
    </SiteLayout>
  );
}

export default Home;

export const strings = {
  heroTitlePoint: 'Open source & privacy friendly',
  heroTitle: 'Disqus alternate',
  heroDescription: 'Build a better community by integrating a modern comment system.',
  callToAction: {
    main: 'Get Early Access',
    secondary: 'Learn More',
  },
};
