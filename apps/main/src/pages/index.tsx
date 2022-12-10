import { HomeProps } from '@chirpy-dev/ui';
import { isENVDev } from '@chirpy-dev/utils';
import { GetStaticProps } from 'next';

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
  heroTitlePoint: 'Open source & privacy friendly',
  heroTitle: 'Disqus alternate',
  heroDescription:
    'Build stronger, more engaged communities by integrating our moden comment system.',
  callToAction: {
    main: 'Get Early Access',
    secondary: 'Learn More',
  },
};

export { HomePage as default } from '@chirpy-dev/ui';
