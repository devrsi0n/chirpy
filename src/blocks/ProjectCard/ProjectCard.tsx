import Loader from '@geist-ui/react-icons/loader';
import MoreVertical from '@geist-ui/react-icons/moreVertical';
import Trash2 from '@geist-ui/react-icons/trash2';
import TrendingUp from '@geist-ui/react-icons/trendingUp';
import * as React from 'react';
import tw from 'twin.macro';

import { BaseButton, Button } from '$/components/Button';
import { Card } from '$/components/Card';
import { Dialog, DialogFooter } from '$/components/Dialog';
import { Divider } from '$/components/Divider';
import { DropDown, DropDownItem } from '$/components/DropDown';
import { Heading } from '$/components/Heading';
import { Link } from '$/components/Link';
import { List } from '$/components/List';
import { Text } from '$/components/Text';
import { useToast } from '$/components/Toast';
import { useDeleteProjectByPkMutation } from '$/graphql/generated/project';
import { UserDashboardProjectsQuery } from '$/graphql/generated/user';
import { listHoverable } from '$/styles/common';
import { dayjs } from '$/utilities/date';

import { IntegrateGuide } from '../IntegrateGuide';

export type ProjectCardProps = {
  project: NonNullable<UserDashboardProjectsQuery['userByPk']>['projects'][number];
  onDeletedProject: () => void;
};

export function ProjectCard({ project, onDeletedProject }: ProjectCardProps): JSX.Element {
  const pageviewsTwoDaysAgo = getSumPageviews(project.sessionsTwoDaysAgo);
  const pageviewsYesterday = getSumPageviews(project.sessionsTwoDaysAgo);
  const grow = (pageviewsYesterday - pageviewsTwoDaysAgo) / pageviewsTwoDaysAgo || 0;
  const [deletingProjectName, setDeletingProject] = React.useState('');
  const [deletingProjectId, setDeletingProjectId] = React.useState('');
  const handleClickDeleteProjectMenu = (id: string, name: string) => {
    setDeletingProjectId(id);
    setDeletingProject(name);
  };
  const handleCloseDialog = () => {
    setDeletingProjectId('');
    setDeletingProject('');
  };
  const [deleteProjectByPkMutation, { loading }] = useDeleteProjectByPkMutation();
  const { showToast } = useToast();
  const handleClickConfirmDelete = async () => {
    try {
      await deleteProjectByPkMutation({
        variables: {
          id: deletingProjectId,
        },
      });
      setDeletingProjectId('');
      setDeletingProject('');
      onDeletedProject();
    } catch (error) {
      console.error(error);
      showToast({
        type: 'error',
        title: 'Sorry, something wrong in our side, please try again later.',
      });
    }
  };

  return (
    <Card as="section" key={project.id} tw="pt-4 space-y-4">
      <div tw="flex justify-between flex-nowrap flex-row items-center space-x-2 pl-6 pr-3">
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
          <Link variant="plain" href={`/analytics/${project.id}`} tabIndex={-1}>
            <BaseButton
              tw="rounded-full p-2"
              css={grow > 0 ? tw`text-green-900` : tw`text-yellow-900`}
            >
              <span
                tw="p-2 rounded-full border transition"
                css={
                  grow > 0
                    ? tw`border-green-300 hover:(border-green-500)`
                    : tw`border-yellow-500 hover:(border-yellow-700) transform -scale-y-1`
                }
              >
                <TrendingUp size={18} />
              </span>
            </BaseButton>
          </Link>
          <div tw="mr-5">
            <Text size="sm" bold variant="secondary">
              {pageviewsYesterday}
            </Text>
            <Text
              size="xs"
              tw="font-bold"
              css={grow > 0 ? tw`text-green-900` : tw`text-yellow-900`}
            >
              {`${grow > 0 ? '+' : ''}${grow * 100}`}%
            </Text>
          </div>
          <DropDown
            classes={{ root: tw`mr-2` }}
            content={
              <span tw="p-1">
                <MoreVertical size={20} />
              </span>
            }
          >
            <DropDownItem
              onClick={() => handleClickDeleteProjectMenu(project.id, project.name)}
              tw="space-x-1"
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </DropDownItem>
          </DropDown>
        </div>
      </div>
      <div tw="px-6 flex flex-row space-x-2">
        <Link href={`/theme/${project.id}`} variant="plain" tabIndex={-1}>
          <Button tw="" color="primary" shadow={false}>
            Theme
          </Button>
        </Link>
        <IntegrateGuide pid={project.id} />
      </div>
      {project.pages.length > 0 ? (
        <List tw="px-6">
          {project.pages.map((page) => (
            <Link
              key={page.id}
              href={page.url}
              title={page.title || page.url}
              variant="plain"
              tw="inline-block w-72 overflow-ellipsis overflow-hidden whitespace-nowrap -translate-x-2"
            >
              <List.Item css={[listHoverable]}>{page.title || page.url}</List.Item>
            </Link>
          ))}
        </List>
      ) : (
        <Text tw="px-6" variant="secondary">
          No page integrated
        </Text>
      )}
      <Divider />
      <div tw="px-6 pb-4">
        <Text tw="leading-none" size="sm" variant="secondary">
          Created {dayjs(project.createdAt).fromNow()}
        </Text>
      </div>
      <Dialog
        type="Alert"
        title={
          <>
            Delete the project <span tw="font-bold">{deletingProjectName}</span>
          </>
        }
        show={!!deletingProjectName}
        onClose={handleCloseDialog}
      >
        <Text>
          All of your project data will be deleted permanently. This action cannot be undone.
        </Text>
        <DialogFooter>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="solid" color="red" onClick={handleClickConfirmDelete} disabled={loading}>
            {loading ? <Loader /> : 'Delete'}
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
}

function getSumPageviews(sessions: ProjectCardProps['project']['sessionsYesterday']): number {
  return sessions.reduce(
    (result, _session) => result + (_session.events_aggregate.aggregate?.count || 0),
    0,
  );
}
