import dynamic from 'next/dynamic';
import * as React from 'react';

import type { BlogSitesIndexProps } from './components/blog-site/home';
import type { DocsSiteHomeProps } from './components/docs-site/home';

type BlogProps = {
  blog: BlogSitesIndexProps;
};

type DocsProps = {
  docs: DocsSiteHomeProps;
};

export type SitesHomeProps = BlogProps | DocsProps;

export function SitesHome(props: SitesHomeProps): JSX.Element {
  if (isBlogProps(props)) {
    return <DeferredBlogSitesIndex {...props.blog} />;
  }
  return <DeferredDocsSitesIndex {...props.docs} />;
}

const DeferredBlogSitesIndex = dynamic(
  import(
    /* webpackChunkName: "blog-site-home"*/ './components/blog-site/home'
  ).then((module) => module.BlogSitesIndex),
  {
    ssr: true,
  },
);

const DeferredDocsSitesIndex = dynamic(
  import(
    /* webpackChunkName: "docs-site-home"*/ './components/docs-site/home'
  ).then((module) => module.DocsSiteHome),
  {
    ssr: true,
  },
);

function isBlogProps(props: SitesHomeProps): props is BlogProps {
  return !!(props as BlogProps).blog;
}
