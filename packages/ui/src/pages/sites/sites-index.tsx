import dynamic from 'next/dynamic';
import * as React from 'react';

import type { BlogSitesIndexProps } from './components/blog-sites-index';
import type { DocsSitesIndexProps } from './components/docs-sites-index';

type BlogProps = {
  blog: BlogSitesIndexProps;
};

type DocsProps = {
  docs: DocsSitesIndexProps;
};

export type SitesIndexProps = BlogProps | DocsProps;

export function SitesIndex(props: SitesIndexProps): JSX.Element {
  if (isBlogProps(props)) {
    return <DeferredBlogSitesIndex {...props.blog} />;
  }
  return <DeferredDocsSitesIndex {...props.docs} />;
}

const DeferredBlogSitesIndex = dynamic(
  import(
    /* webpackChunkName: "blog-sites-index"*/ './components/blog-sites-index'
  ).then((module) => module.BlogSitesIndex),
  {
    ssr: true,
  },
);

const DeferredDocsSitesIndex = dynamic(
  import(
    /* webpackChunkName: "docs-sites-index"*/ './components/docs-sites-index'
  ).then((module) => module.DocsSitesIndex),
  {
    ssr: true,
  },
);

function isBlogProps(props: SitesIndexProps): props is BlogProps {
  return !!(props as BlogProps).blog;
}
