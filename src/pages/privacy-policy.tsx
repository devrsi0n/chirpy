import { GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { MDXComponents } from '$/blocks/MDXComponents';
import { getMDXPropsBySlug, MDXProps } from '$/server/mdx/mdx';

export default function PrivacyPolicy({ mdxSource, frontMatter }: MDXProps): JSX.Element {
  return (
    <section>
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      <article tw="mx-auto prose lg:prose-xl py-16">
        <MDXRemote {...mdxSource} components={MDXComponents} />
      </article>
    </section>
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
