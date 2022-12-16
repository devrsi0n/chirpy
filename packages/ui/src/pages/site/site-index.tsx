import { useRouter } from 'next/router';
import * as React from 'react';

import { SiteLayout } from '../../blocks';
import { trpcClient } from '../../utilities';

export function SiteIndex(): JSX.Element {
  const router = useRouter();
  const { id: siteId } = router.query;
  if (typeof siteId !== 'string') {
    router.push(`/404`);
    return <></>;
  }
  const { data } = trpcClient.site.byId.useQuery(siteId);
  if (!data) {
    router.push(`/404`);
    return <></>;
  }
  return (
    <SiteLayout title={`Posts for site ${data?.name}`}>
      <section>
        <ul>
          {data.posts.map((post) => (
            <li key={post.id}>
              <a href={`${data.subdomain}/post/${post.slug}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      </section>
    </SiteLayout>
  );
}
