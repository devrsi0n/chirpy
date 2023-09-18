import * as React from 'react';

import {
  CrispChatWithoutSSR,
  FAQs,
  Features,
  HomeCommentWidgetPreview,
  HomeCommentWidgetPreviewProps,
  Pricing,
  SiteLayout,
} from '../blocks';
import { Button, IconArrowRight, Link, Text } from '../components';

export type HomeProps = HomeCommentWidgetPreviewProps;

export function HomePage({ buildDate }: HomeProps): JSX.Element {
  return (
    <SiteLayout enableBgGradient title="" hideFullBleed>
      <section className="relative z-[1] flex min-h-full flex-col items-center space-y-24 px-2 sm:px-0">
        <div className="space-y-8">
          <h1 className="mt-1 w-full max-w-4xl text-center text-4xl font-semibold leading-tight tracking-tight text-gray-1200 sm:text-6xl">
            {strings.heroTitle}
          </h1>
          <Text
            size="lg"
            className="flex w-full flex-col items-center text-center"
            variant="secondary"
          >
            {strings.heroDescription}
          </Text>
          <div className="flex items-center justify-center space-x-6">
            <Link variant="plain" href="/new" tabIndex={-1}>
              <Button
                variant="solid"
                color="primary"
                className="group space-x-1 hover:shadow-xl"
              >
                <span>{strings.callToAction.main}</span>
                <IconArrowRight
                  size="20px"
                  className="inline-block transition group-hover:translate-x-1"
                />
              </Button>
            </Link>
            <Link variant="plain" href="/docs" tabIndex={-1}>
              <Button>{strings.callToAction.secondary}</Button>
            </Link>
          </div>
        </div>
        <Features />
        <div className="w-[min(75ch,calc(100%-32px))]">
          <HomeCommentWidgetPreview buildDate={buildDate} />
        </div>
        <Pricing id="pricing" />
        <FAQs id="faqs" />
      </section>
      <CrispChatWithoutSSR />
    </SiteLayout>
  );
}

export const strings = {
  heroTitle:
    'Take control of your data: discover the privacy-friendly comment system built for You',
  heroDescription: (
    <>
      <span>
        Chirpy is an open-source Disqus alternate to help you build better
        communities.
      </span>
      <span>Trust by over 290 bloggers, creators and founders.</span>
    </>
  ),
  callToAction: {
    main: 'Start building',
    secondary: 'Learn More',
  },
};
