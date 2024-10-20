import { Button, IconArrowRight, IconGithub, Link, Text } from '@chirpy-dev/ui';
import { isENVDev } from '@chirpy-dev/utils';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import * as React from 'react';

import {
  HomeCommentWidgetPreview,
  type HomeCommentWidgetPreviewProps,
} from '../components/comment-widget-preview';
import { CrispChatWithoutSSR } from '../components/crisp-chat';
import { FAQs } from '../components/faqs';
import { Features } from '../components/features';
import { SiteLayout } from '../components/layout';
import { Pricing } from '../components/pricing';

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const buildDate = new Date().toISOString();
  return {
    props: {
      // We need a fixed date to fix SSR hydration mismatch error.
      // Used by predefined comments in comment-widget-preview
      buildDate,
    },
    revalidate: isENVDev ? 1 : 2 * 24 * 60 * 60,
  };
};

export const strings = {
  heroTitlePoint: 'Open source & privacy-friendly',
  heroTitle: 'Disqus alternate for your community',
  heroDescription:
    'Build a better community by integrating a modern comment system.',
  callToAction: {
    main: 'Get started',
    secondary: 'Star on GitHub',
  },
};

type HomeProps = HomeCommentWidgetPreviewProps;

export default function HomePage({ buildDate }: HomeProps): JSX.Element {
  return (
    <SiteLayout enableBgGradient title="" hideFullBleed>
      <NextSeo
        twitter={{
          handle: '@ChirpyHQ',
          site: '@ChirpyHQ',
          cardType: 'summary_large_image',
        }}
      />
      <section className="relative z-[1] flex min-h-full flex-col items-center space-y-24 px-2 sm:px-0">
        <div className="space-y-8">
          <h1 className="mt-1 w-full max-w-2xl text-center text-4xl font-black leading-snug text-gray-1200">
            <span className="inline-block bg-gradient-to-r from-primary-900 to-plum-900 bg-clip-text text-transparent">
              {strings.heroTitlePoint}
            </span>{' '}
            <span>{strings.heroTitle}</span>
          </h1>
          <Text
            size="lg"
            className="flex w-full flex-col items-center text-center"
            variant="secondary"
          >
            {strings.heroDescription}
          </Text>
          <div className="flex items-center justify-center space-x-6">
            <Link
              variant="plain"
              href="https://github.com/devrsi0n/chirpy"
              tabIndex={-1}
            >
              <Button className="gap-2">
                <IconGithub size={20} />
                {strings.callToAction.secondary}
              </Button>
            </Link>
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
