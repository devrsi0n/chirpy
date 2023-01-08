import * as React from 'react';

import { Heading, Link, Text } from '../../../components';
import { trpcClient } from '../../../utilities';
import { AppLayout } from '../components/app-layout';

export type SiteIndexProps = {
  id: string;
};

export function SiteIndex({ id }: SiteIndexProps): JSX.Element {
  const { data } = trpcClient.site.byId.useQuery(id);
  return (
    <AppLayout title={`Posts for site ${data?.name}`}>
      <div>
        <Heading as="h1">{`Posts for site ${data?.name}`}</Heading>
        <Text>{data?.subdomain}</Text>
      </div>
      <Link variant="plain" href={`/site/${data?.id}/settings`}>
        Settings
      </Link>
      <section>
        <ul>
          {data?.posts.length || 0 > 0 ? (
            data?.posts.map((post) => (
              <li key={post.id}>
                <a href={`${data?.subdomain}/post/${post.slug}`}>
                  {/* {post.title} */}
                </a>
              </li>
            ))
          ) : (
            <div>No posts yet</div>
          )}
        </ul>
      </section>
    </AppLayout>
  );
}
