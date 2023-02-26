import dynamic from 'next/dynamic';
import * as React from 'react';

import type { BlogHomeProps } from './components/blog-site/home';
import type { DocsSiteHomeProps } from './components/docs-site/home';

type BlogProps = {
  blog: BlogHomeProps;
};

type DocsProps = {
  docs: DocsSiteHomeProps;
};

export type SitesHomeProps = BlogProps | DocsProps;

export function SitesHome(props: SitesHomeProps): JSX.Element {
  if (isBlogProps(props)) {
    return <DeferredBlogHome {...props.blog} />;
  }
  return <DeferredDocsHome {...props.docs} />;
}

const DeferredBlogHome = dynamic(
  import(
    /* webpackChunkName: "blog-site-home"*/ './components/blog-site/home'
  ).then((module) => module.BlogHome),
  {
    ssr: true,
  },
);

const DeferredDocsHome = dynamic(
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
