import * as React from 'react';

import { PrimaryTabs } from '../../../../components';
import { PostFields } from '../../types';
import { BlogHero } from './hero';
import { BlogSiteLayout } from './layout';
import { PostCard } from './post-card';

export type BlogHomeProps = {
  name: string;
  posts: PostFields[];
};

const VIEW_ALL = 'View All';

export function BlogHome(props: BlogHomeProps): JSX.Element {
  const featuredPost = props.posts.find((p) => p.featured);
  const restPosts = props.posts.filter((p) => p.pageId !== featuredPost.pageId);
  const tags = [VIEW_ALL, ...restPosts.flatMap((p) => p.tags || [])];
  return (
    <BlogSiteLayout>
      <BlogHero
        title="Transforming designs into realities"
        description="Subscribe to learn about the latest in technology, user experience, and updates."
        decorator="Blog"
        privacyLink="/"
      />
      {featuredPost && (
        <PostCard
          {...featuredPost}
          orientation="horizontal"
          className="mb-16"
        />
      )}
      <section className="pb-24">
        <PrimaryTabs defaultValue={VIEW_ALL}>
          <PrimaryTabs.List className="mb-12">
            {tags.map((tag) => (
              <PrimaryTabs.Trigger key={tag} value={tag}>
                {tag}
              </PrimaryTabs.Trigger>
            ))}
          </PrimaryTabs.List>
          {tags.map((tag) => (
            <PrimaryTabs.Content key={tag} value={tag}>
              <ul className="grid grid-cols-3 gap-x-8 gap-y-12">
                {restPosts
                  .filter((p) =>
                    tag === VIEW_ALL ? true : p.tags?.includes(tag),
                  )
                  .map((post) => (
                    <li key={post.pageId}>
                      <PostCard {...post} />
                    </li>
                  ))}
              </ul>
            </PrimaryTabs.Content>
          ))}
        </PrimaryTabs>
      </section>
    </BlogSiteLayout>
  );
}
