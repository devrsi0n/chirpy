import * as React from 'react';

import { Card, Divider, Heading, Link, List, Text } from '../../components';
import { listHoverable } from '../../styles/common';
import { cpDayjs } from '../../utilities/date';
import { RouterOutputs } from '../../utilities/trpc-client';

export type SiteCardProps = {
  site: RouterOutputs['site']['all'][number];
};

export function SiteCard({ site }: SiteCardProps): JSX.Element {
  const posts = site.posts.slice(0, 5);

  return (
    <Card as="section" key={site.id} className="space-y-4 pt-4">
      <Link variant="plain" className="block" href={`/site/${site.id}`}>
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
                  <Link
                    href={page.url}
                    title={page.title || page.url}
                    variant="plain"
                    className="inline-block max-w-xs overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {page.title || page.url}
                  </Link>
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
      </Link>
    </Card>
  );
}
