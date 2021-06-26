import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { MDXComponents } from '$/blocks/MDXComponents';
import { Layout } from '$/components/Layout';
import { getMDXPropsBySlug, MDXProps } from '$/server/mdx/mdx';

export default function PrivacyPolicy({ mdxSource, frontMatter }: MDXProps): JSX.Element {
  return (
    <Layout>
      <section>
        <Head>
          <title>{frontMatter.title}</title>
        </Head>
        <article tw="prose lg:prose-xl">
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </article>
      </section>
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: MDXProps;
}> {
  const privacyPolicyProps = await getMDXPropsBySlug('privacy-policy');
  return { props: privacyPolicyProps };
}
