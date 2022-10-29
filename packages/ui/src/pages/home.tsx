import * as React from 'react';

import {
  HomeCommentWidgetPreview,
  HomeCommentWidgetPreviewProps,
  FAQs,
  Features,
  SiteLayout,
  Pricing,
} from '../blocks';
import { Button, IconArrowRight, Link, Text } from '../components';

export type HomeProps = HomeCommentWidgetPreviewProps;

export function HomePage({ buildDate }: HomeProps): JSX.Element {
  return (
    <SiteLayout enableBgGradient title="" hideFullBleed>
      <section className="flex min-h-full flex-col items-center space-y-24">
        <div className="space-y-8">
          <h1 className="mt-1 w-full max-w-2xl text-center text-4xl font-black leading-snug text-gray-1200">
            <span className="inline-block bg-gradient-to-r from-primary-900 to-plum-900 bg-clip-text text-transparent">
              {strings.heroTitlePoint}
            </span>{' '}
            <span>{strings.heroTitle}</span>
          </h1>
          <Text className="text-center" variant="secondary">
            {strings.heroDescription}
          </Text>
          <div className="flex items-center justify-center space-x-6">
            <Link variant="plain" href="/auth/sign-in" tabIndex={-1}>
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
    </SiteLayout>
  );
}

export const strings = {
  heroTitlePoint: 'Open source & privacy friendly',
  heroTitle: 'Disqus alternate',
  heroDescription:
    'Build a better community by integrating a modern comment system.',
  callToAction: {
    main: 'Get Early Access',
    secondary: 'Learn More',
  },
};
