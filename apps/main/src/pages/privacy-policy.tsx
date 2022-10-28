import { GetStaticProps } from 'next';

import { MDXProps } from 'types';

import { getMDXPropsBySlug } from '$/server/mdx/mdx';

export const getStaticProps: GetStaticProps<MDXProps> = async () => {
  const privacyPolicyProps = await getMDXPropsBySlug('privacy-policy');
  return {
    props: {
      ...privacyPolicyProps,
    },
  };
};

export { PrivacyPolicy as default } from '@chirpy-dev/ui';
