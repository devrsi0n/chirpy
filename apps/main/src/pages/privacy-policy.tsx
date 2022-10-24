import { GetStaticProps } from 'next';
import { PrivacyPolicy } from 'ui';
import { MDXProps } from 'types';

import { getMDXPropsBySlug } from '$/server/mdx/mdx';

export default PrivacyPolicy;

export const getStaticProps: GetStaticProps<MDXProps> = async () => {
  const privacyPolicyProps = await getMDXPropsBySlug('privacy-policy');
  return {
    props: {
      ...privacyPolicyProps,
    },
  };
};
