import * as React from 'react';

import { PageTitle } from '../../../../blocks';
import { PostPage } from '../../types';
import { BlogSiteLayout } from './layout';
import { PostCard } from './post-card';

export type BlogSitesIndexProps = {
  name: string;
  posts: PostPage[];
};

export function BlogSitesIndex(props: BlogSitesIndexProps): JSX.Element {
  return (
    <BlogSiteLayout>
      <PageTitle>{props.name} Blog</PageTitle>
      <ul>
        {props.posts.map((page) => (
          <li key={page.pageId}>
            <PostCard {...page} />
          </li>
        ))}
      </ul>
    </BlogSiteLayout>
  );
}
