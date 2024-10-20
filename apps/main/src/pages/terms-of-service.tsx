import { CommonPageProps, MDXProps } from '@chirpy-dev/types';
import { GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import * as React from 'react';

import { getMDXPropsBySlug } from '$/server/mdx/mdx';
import { SiteLayout } from '../components/layout';
import { MDXComponents } from '../components/mdx-components';

export const getStaticProps: GetStaticProps<
  CommonPageProps & MDXProps
> = async () => {
  const termsProps = await getMDXPropsBySlug('terms-of-service');
  return { props: termsProps };
};

export default function TermsOfService({
  mdxSource,
  frontMatter,
}: MDXProps): JSX.Element {
  return (
    <SiteLayout title={frontMatter.title || 'Terms of service'}>
      <section>
        <article className="prose mx-auto lg:prose-xl">
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </article>
      </section>
    </SiteLayout>
  );
}
