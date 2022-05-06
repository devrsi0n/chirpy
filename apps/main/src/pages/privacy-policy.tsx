import { GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import * as React from 'react';

import { SiteLayout } from '@chirpy/blocks';
import { MDXComponents } from '@chirpy/blocks';
import { getMDXPropsBySlug, MDXProps } from '$/server/mdx/mdx';

export default function PrivacyPolicy({ mdxSource, frontMatter }: MDXProps): JSX.Element {
  return (
    <SiteLayout title={frontMatter.title || 'Privacy policy'}>
      <section>
        <article className="mx-auto prose lg:prose-xl py-16">
          {/* @ts-ignore */}
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </article>
      </section>
    </SiteLayout>
  );
}

export const getStaticProps: GetStaticProps<MDXProps> = async () => {
  const privacyPolicyProps = await getMDXPropsBySlug('privacy-policy');
  return {
    props: {
      ...privacyPolicyProps,
    },
  };
};