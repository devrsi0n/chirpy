import { GetStaticProps } from 'next';
import * as React from 'react';

import {
  HomeCommentWidgetPreview,
  HomeCommentWidgetPreviewProps,
} from '$/blocks/comment-widget-preview';
import { FAQs } from '$/blocks/faqs';
import { Features } from '$/blocks/features';
import { SiteLayout } from '$/blocks/layout';
import { Pricing } from '$/blocks/pricing';
import { Button } from '$/components/button';
import { IconArrowRight } from '$/components/icons';
import { Link } from '$/components/link';
import { Text } from '$/components/text';

type HomeProps = HomeCommentWidgetPreviewProps;

export default function Home({ buildDate }: HomeProps): JSX.Element {
  return (
    <SiteLayout enableBgGradient title="">
      <section className="flex min-h-full flex-col items-center space-y-24">
        <div className="space-y-8">
          <h1 className="mt-1 w-full max-w-2xl text-4xl font-black leading-snug text-gray-1200 sm:text-center">
            <span className="inline-block bg-gradient-to-r from-primary-900 to-plum-900 bg-clip-text text-transparent">
              {strings.heroTitlePoint}
            </span>{' '}
            <span>{strings.heroTitle}</span>
          </h1>
          <Text className="sm:text-center" variant="secondary">
            {strings.heroDescription}
          </Text>
          <div className="flex items-center space-x-6 sm:justify-center">
            <Link variant="plain" href="/auth/sign-in" tabIndex={-1}>
              <Button
                variant="solid"
                color="primary"
                className="group space-x-1 hover:shadow-2xl"
              >
                <span>{strings.callToAction.main}</span>
                <IconArrowRight
                  size="20px"
                  className="inline-block transition group-hover:translate-x-1"
                />
              </Button>
            </Link>
            <Link variant="plain" href="/docs/index" tabIndex={-1}>
              <Button>{strings.callToAction.secondary}</Button>
            </Link>
          </div>
        </div>
        <Features />
        <HomeCommentWidgetPreview buildDate={buildDate} />
        <Pricing id="pricing" />
        <FAQs />
      </section>
    </SiteLayout>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      // We need a fixed date to fix SSR hydration mismatch error.
      // Used by predefined comments in comment-widget-preview
      buildDate: new Date().toISOString(),
    },
  };
};

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
