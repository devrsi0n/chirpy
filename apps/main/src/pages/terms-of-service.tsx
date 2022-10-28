import { GetStaticProps } from 'next';

import { CommonPageProps, MDXProps } from '@chirpy-dev/types';

import { getMDXPropsBySlug } from '$/server/mdx/mdx';

export const getStaticProps: GetStaticProps<
  CommonPageProps & MDXProps
> = async () => {
  const termsProps = await getMDXPropsBySlug('terms-of-service');
  return { props: termsProps };
};

export { TermsOfService as default } from '@chirpy-dev/ui';
