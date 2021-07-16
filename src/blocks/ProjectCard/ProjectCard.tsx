import TrendingUp from '@geist-ui/react-icons/trendingUp';
import * as React from 'react';
import tw from 'twin.macro';

import { Button, IconButton } from '$/components/Button';
import { Divider } from '$/components/Divider';
import { Heading } from '$/components/Heading';
import { Link } from '$/components/Link';
import { List } from '$/components/List';
import { Text } from '$/components/Text';
import { ProjectsOfDashboardQuery } from '$/server/graphql/generated/project';
import { dayjs } from '$/utilities/date';

import { IntegrateGuide } from '../IntegrateGuide';

export type ProjectCardProps = {
  project: ProjectsOfDashboardQuery['projects'][number];
};

export function ProjectCard({ project }: ProjectCardProps): JSX.Element {
  const pageviewsTwoDaysAgo = getSumPageviews(project.sessionsTwoDaysAgo);
  const pageviewsYesterday = getSumPageviews(project.sessionsTwoDaysAgo);
  const grow = (pageviewsYesterday - pageviewsTwoDaysAgo) / pageviewsTwoDaysAgo || 0;
  return (
    <section
      key={project.id}
      tw="bg-white pt-4 rounded-lg space-y-4"
      style={{
        // TODO: Extract boxshadow to tailwindcss config
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 5px 10px 0px',
      }}
    >
      <div tw="px-6 flex justify-between flex-nowrap flex-row items-center space-x-2">
        <Heading tw="font-bold" as="h3">
          {project.name}
        </Heading>
        <div
          title={
            project.pages.length > 0
              ? 'You already integrated this project into at least one page'
              : 'No page integrated'
          }
          tw="flex flex-row items-center"
        >
          <Link variant="plain" href={`/analytics/${project.id}`}>
            <IconButton css={grow > 0 ? tw`text-green-600` : tw`text-yellow-600`}>
              <span
                tw="p-2 rounded-full"
                css={grow > 0 ? tw`bg-green-50` : tw`bg-yellow-50 transform -scale-y-1`}
              >
                <TrendingUp size={18} />
              </span>
            </IconButton>
          </Link>
          <div>
            <Text variant="sm" bold>
              {pageviewsYesterday}
            </Text>
            <Text variant="xs" css={grow > 0 ? tw`text-green-600` : tw`text-yellow-600`}>
              {`${grow > 0 ? '+' : ''}${grow * 100}`}%
            </Text>
          </div>
        </div>
      </div>
      <div tw="px-6 flex flex-row space-x-2">
        <Link href={`/theme/${project.id}`} variant="plain">
          <Button tw="" color="primary" shadow={false} size="sm">
            Theme
          </Button>
        </Link>
        <IntegrateGuide pid={project.id} />
      </div>
      {project.pages.length > 0 ? (
        <List tw="px-6 space-y-1.5">
          {project.pages.map((page) => (
            <List.Item key={page.id} markerStyle={tw`bg-black`}>
              <Link
                href={page.url}
                title={page.title || page.url}
                variant="plain"
                tw="text-gray-600 hover:text-gray-900 inline-block w-72 overflow-ellipsis overflow-hidden whitespace-nowrap"
              >
                {page.title || page.url}
              </Link>
            </List.Item>
          ))}
        </List>
      ) : (
        <Text tw="px-6">No page integrated</Text>
      )}
      <Divider />
      <div tw="px-6 pb-4">
        <Text tw="text-gray-400 leading-none" variant="sm">
          Created {dayjs(project.createdAt).fromNow()}
        </Text>
      </div>
    </section>
  );
}

function getSumPageviews(sessions: ProjectCardProps['project']['sessionsYesterday']): number {
  return sessions.reduce(
    (result, _session) => result + (_session.events_aggregate.aggregate?.count || 0),
    0,
  );
}
