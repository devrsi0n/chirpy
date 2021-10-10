import { GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { MDXComponents } from '$/blocks/MDXComponents';
import { getMDXPropsBySlug, MDXProps } from '$/server/mdx/mdx';
import { CommonPageProps } from '$/types/page.type';

export default function TermsOfService({ mdxSource, frontMatter }: MDXProps): JSX.Element {
  return (
    <section>
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      <article tw="mx-auto prose lg:prose-xl">
        <MDXRemote {...mdxSource} components={MDXComponents} />
      </article>
    </section>
  );
}

export const getStaticProps: GetStaticProps<CommonPageProps & MDXProps> = async () => {
  const termsProps = await getMDXPropsBySlug('terms-of-service');
  return { props: termsProps };
};
