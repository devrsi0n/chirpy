import * as React from 'react';

import { PageTitle } from '../../../../blocks';
import { PostPage } from '../../types';
import { BlogSiteLayout } from './layout';
import { PostCard } from './post-card';

export type BlogSitesIndexProps = {
  name: string;
  pages: PostPage[];
};

export function BlogSitesIndex(props: BlogSitesIndexProps): JSX.Element {
  return (
    <BlogSiteLayout>
      <PageTitle>{props.name} Blog</PageTitle>
      <ul>
        {props.pages.map((page) => (
          <li key={page.id}>
            <PostCard {...page} />
          </li>
        ))}
      </ul>
    </BlogSiteLayout>
  );
}
