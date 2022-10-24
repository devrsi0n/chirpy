import { GetStaticProps } from 'next';
import { TermsOfService } from 'ui';
import { CommonPageProps, MDXProps } from 'types';

import { getMDXPropsBySlug } from '$/server/mdx/mdx';

export default TermsOfService;

export const getStaticProps: GetStaticProps<
  CommonPageProps & MDXProps
> = async () => {
  const termsProps = await getMDXPropsBySlug('terms-of-service');
  return { props: termsProps };
};
