// import { Link } from '$/components/link';
import Link from 'next/link';
import * as React from 'react';
import tw from 'twin.macro';

import { BaseButton } from '$/components/button';
import { Card } from '$/components/card';
import { Divider } from '$/components/divider';
import { Heading } from '$/components/heading';
import { List } from '$/components/list';
import { Text } from '$/components/text';
import { DomainOfProjectsQuery } from '$/server/graphql/generated/project';
import { listHoverable } from '$/styles/common';

type AdminCardProps = {
  project: DomainOfProjectsQuery['projects'][number];
};

export function AdminCard({ project }: AdminCardProps): JSX.Element {
  const [pageSize, setPageSize] = React.useState(5);
  const pages = project.pages.slice(0, pageSize);
  const showExpandBtn = project.pages.length > 5;
  const isExpanded = pages.length === project.pages.length;

  function handleClickExpand(): void {
    if (pageSize === project.pages.length) {
      return setPageSize(5);
    }
    const newSize = Math.min(pageSize + 5, project.pages.length);
    setPageSize(newSize);
  }

  return (
    <Card as="section" key={project.id} tw="min-w-full pt-4 space-y-4">
      <div tw="flex justify-between flex-nowrap flex-row items-center space-x-2 pl-6 pr-3">
        <Heading as="h3">{project.name}</Heading>
      </div>
      <Text tw="px-6" variant="secondary">
        {project.domain}
      </Text>
      {pages.length > 0 ? (
        <div>
          <List tw="px-4">
            {pages.map((page) => (
              <List.Item key={page.id} css={[listHoverable]}>
                <Link
                  href={{ pathname: `/admin/comment`, query: { pageId: page.id } }}
                  title={page.title || page.url}
                  variant="plain"
                  tw="inline-block max-w-xs overflow-ellipsis overflow-hidden whitespace-nowrap"
                >
                  {page.title || page.url}
                </Link>
              </List.Item>
            ))}
          </List>
          {showExpandBtn && (
            <BaseButton
              aria-expanded={isExpanded}
              onClick={handleClickExpand}
              tw="text-primary-900 hover:(bg-primary-900 text-white) rounded px-2 py-1 ml-4"
            >
              {!isExpanded ? 'Show more' : 'Show less'}
            </BaseButton>
          )}
        </div>
      ) : (
        <Text tw="px-6" variant="secondary">
          This Project has no page
        </Text>
      )}
      <Divider />
    </Card>
  );
}
