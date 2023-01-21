import * as React from 'react';

import { PageTitle } from '../../../blocks';
import { PostPage } from '../types';
import { PostCard } from './post-card';
import { SitesLayout } from './sites-layout';

export type BlogSitesIndexProps = {
  name: string;
  pages: PostPage[];
};

export function BlogSitesIndex(props: BlogSitesIndexProps): JSX.Element {
  return (
    <SitesLayout>
      <PageTitle>{props.name} Blog</PageTitle>
      <ul>
        {props.pages.map((page) => (
          <li key={page.id}>
            <PostCard {...page} />
          </li>
        ))}
      </ul>
    </SitesLayout>
  );
}
