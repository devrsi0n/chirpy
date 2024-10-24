import { RouterOutputs } from '@chirpy-dev/trpc/src/client';
import {
  BaseButton,
  Card,
  cpDayjs,
  Divider,
  Heading,
  Link,
  List,
  listHoverable,
  Text,
} from '@chirpy-dev/ui';
import { useRouter } from 'next/router';
import * as React from 'react';

import { useCurrentUser } from '$/contexts';
import { PageViewStats } from './page-view-stats';

export type ProjectCardProps = {
  project: RouterOutputs['project']['all'][number];
};

export function ProjectCard({ project }: ProjectCardProps): JSX.Element {
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

  const router = useRouter();
  const { data } = useCurrentUser();

  return (
    <Card
      as="section"
      key={project.id}
      className="max-w-sm space-y-4 pt-4 hover:cursor-pointer hover:border-primary-600"
      role="button"
      onClick={() => {
        router.push(`/dashboard/${data.username}/${project.domain}`);
      }}
    >
      <div className="flex flex-nowrap items-center justify-between space-x-2 px-6">
        <div className="flex items-center gap-2">
          <DomainFavicon domain={project.domain} />
          <Heading as="h3" className="leading-none">
            {project.name}
          </Heading>
        </div>
        <PageViewStats domain={project.domain} />
      </div>
      <Text className="px-6" variant="secondary">
        {project.domain}
      </Text>
      {pages.length > 0 ? (
        <div>
          <List className="px-4">
            {pages.map((page) => (
              <List.Item key={page.id} className={listHoverable}>
                <Link
                  href={page.url}
                  title={page.title || page.url}
                  variant="plain"
                  className="inline-block max-w-xs overflow-hidden text-ellipsis whitespace-nowrap"
                  onClickCapture={(e) => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                  }}
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
              className="ml-4 rounded px-2 py-1 text-primary-900 hover:bg-primary-900 hover:text-white"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </BaseButton>
          )}
        </div>
      ) : (
        <Text className="px-6" variant="secondary">
          No page integrated
        </Text>
      )}
      <Divider />
      <div className="px-6 pb-4">
        <Text className="!leading-none" size="sm" variant="secondary">
          Created {cpDayjs(project.createdAt).fromNow()}
        </Text>
      </div>
    </Card>
  );
}

function DomainFavicon({ domain }: { domain: string }) {
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=https://${domain}&sz=128`}
      alt={`${domain} logo`}
      width={32}
      height={32}
      className="h-fit"
    />
  );
}
