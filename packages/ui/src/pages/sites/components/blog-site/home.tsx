import * as React from 'react';

import { PostPage } from '../../types';
import { BlogHero } from './hero';
import { BlogSiteLayout } from './layout';
import { PostCard } from './post-card';

export type BlogSitesIndexProps = {
  name: string;
  posts: PostPage[];
};

export function BlogSitesIndex(props: BlogSitesIndexProps): JSX.Element {
  return (
    <BlogSiteLayout>
      <BlogHero
        title="Transforming designs into realities"
        description="Subscribe to learn about the latest in technology, user experience, and updates."
        decorator="Blog"
        privacyLink="/"
      />
      <ul className="grid grid-cols-3 gap-x-8 gap-y-12">
        {props.posts.map((page) => (
          <li key={page.pageId}>
            <PostCard {...page} />
          </li>
        ))}
      </ul>
    </BlogSiteLayout>
  );
}
