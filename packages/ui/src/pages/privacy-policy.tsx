import { MDXRemote } from 'next-mdx-remote';
import * as React from 'react';
import { MDXProps } from 'types';

import { SiteLayout, MDXComponents } from '../blocks';

export function PrivacyPolicy({
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
