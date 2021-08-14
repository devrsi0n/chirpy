import { GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { MDXComponents } from '$/blocks/MDXComponents';
import { getMDXPropsBySlug, MDXProps } from '$/server/mdx/mdx';
import { CommonPageProps } from '$/types/page.type';

export default function PrivacyPolicy({ mdxSource, frontMatter }: MDXProps): JSX.Element {
  return (
    <section tw="py-10">
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      <article tw="mx-auto prose lg:prose-xl py-16">
        <MDXRemote {...mdxSource} components={MDXComponents} />
      </article>
    </section>
  );
}

export const getStaticProps: GetStaticProps<CommonPageProps & MDXProps> = async () => {
  const privacyPolicyProps = await getMDXPropsBySlug('privacy-policy');
  return {
    props: {
      ...privacyPolicyProps,
    },
  };
};
