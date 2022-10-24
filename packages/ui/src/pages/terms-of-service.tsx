import { MDXRemote } from 'next-mdx-remote';
import * as React from 'react';

import { SiteLayout, MDXComponents } from '../blocks';
import { MDXProps } from 'types';

export function TermsOfService({
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
