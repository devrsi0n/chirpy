import { MDXProps } from '@chirpy-dev/types';
import { GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import * as React from 'react';

import { getMDXPropsBySlug } from '$/server/mdx/mdx';
import { SiteLayout } from '../components/layout';
import { MDXComponents } from '../components/mdx-components';

export const getStaticProps: GetStaticProps<MDXProps> = async () => {
  const privacyPolicyProps = await getMDXPropsBySlug('privacy-policy');
  return {
    props: {
      ...privacyPolicyProps,
    },
  };
};

export default function PrivacyPolicy({
  mdxSource,
  frontMatter,
}: MDXProps): JSX.Element {
  return (
    <SiteLayout title={frontMatter.title || 'Privacy policy'}>
      <section>
        <article className="prose mx-auto py-16 lg:prose-xl">
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </article>
      </section>
    </SiteLayout>
  );
}
