import * as React from 'react';

import { Heading, Link, Text } from '../../../components';
import { trpcClient } from '../../../utilities';
import { AppLayout } from '../components/app-layout';

export type SiteHomeProps = {
  subdomain: string;
};

export function SiteHome({ subdomain }: SiteHomeProps): JSX.Element {
  const { data } = trpcClient.site.bySubdomain.useQuery(subdomain);
  return (
    <AppLayout title={`Posts of ${data?.name} site`} subdomain={subdomain}>
      <div>
        <Heading as="h1">{`Posts of ${data?.name} site`}</Heading>
        <Text>{data?.subdomain}</Text>
      </div>
      <Link variant="plain" href={`/site/${data?.subdomain}/settings`}>
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
