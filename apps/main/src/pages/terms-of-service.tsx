import { GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import * as React from 'react';

import { SiteLayout, MDXComponents } from 'ui';
import { getMDXPropsBySlug, MDXProps } from '$/server/mdx/mdx';
import { CommonPageProps } from 'types';

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

export const getStaticProps: GetStaticProps<
  CommonPageProps & MDXProps
> = async () => {
  const termsProps = await getMDXPropsBySlug('terms-of-service');
  return { props: termsProps };
};
