import { MDXProps } from '@chirpy-dev/types';
import { GetStaticProps } from 'next';

import { getMDXPropsBySlug } from '$/server/mdx/mdx';
import { serializePageProps } from '$/utilities/page-props';

export const getStaticProps: GetStaticProps<MDXProps> = async () => {
  const privacyPolicyProps = await getMDXPropsBySlug('privacy-policy');
  return {
    props: serializePageProps({
      ...privacyPolicyProps,
    }),
  };
};

export { PrivacyPolicy as default } from '@chirpy-dev/ui';
