import { cpDayjs } from '@chirpy-dev/utils/src/date';
import * as React from 'react';

import { Card, Divider, Heading, Link, List, Text } from '../../components';
import { listHoverable } from '../../styles/common';
import { RouterOutputs } from '../../utilities/trpc-client';

export type SiteCardProps = {
  site: RouterOutputs['site']['all'][number];
};

export function SiteCard({ site }: SiteCardProps): JSX.Element {
  const posts = site.posts.slice(0, 5);

  return (
    <Card
      as={Link}
      href={`/site/${site.subdomain}`}
      variant="plain"
      key={site.id}
      className="block space-y-4 pt-4"
    >
      <div className="flex flex-row flex-nowrap items-center justify-between space-x-2 pl-6 pr-3">
        <Heading as="h3">{site.name}</Heading>
      </div>
      <Text className="px-6" variant="secondary">
        {site.subdomain}
      </Text>
      {posts.length > 0 ? (
        <div>
          <List className="px-4">
            {posts.map((page) => (
              <List.Item key={page.id} className={listHoverable}>
                {/* <Text title={page.title}>{page.title}</Text> */}
              </List.Item>
            ))}
          </List>
        </div>
      ) : (
        <Text className="px-6" variant="secondary">
          No posts yet
        </Text>
      )}
      <Divider />
      <div className="px-6 pb-4">
        <Text className="!leading-none" size="sm" variant="secondary">
          Created {cpDayjs(site.createdAt).fromNow()}
        </Text>
      </div>
    </Card>
  );
}
