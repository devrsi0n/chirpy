import hydrate from 'next-mdx-remote/hydrate';
import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { MDXComponents } from '$/blocks/MDXComponents';
import { Layout } from '$/components/Layout';

import { getFileBySlug, MDXSource } from '$shared/mdx';

export default function TermsOfService({ mdxSource, frontMatter }: MDXSource): JSX.Element {
  const content = hydrate(mdxSource, {
    components: MDXComponents,
  });
  return (
    <Layout>
      <section>
        <Head>
          <title>{frontMatter.title}</title>
        </Head>
        <article tw="prose lg:prose-xl">{content}</article>
      </section>
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: MDXSource;
}> {
  const termsProps = await getFileBySlug('terms-of-service');
  return { props: termsProps };
}
