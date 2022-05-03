import Loader from '@geist-ui/react-icons/loader';
import MoreVertical from '@geist-ui/react-icons/moreVertical';
import Trash2 from '@geist-ui/react-icons/trash2';
import * as React from 'react';

import { BaseButton, Button } from '@chirpy/components';
import { Card } from '@chirpy/components';
import { Dialog } from '@chirpy/components';
import { Divider } from '@chirpy/components';
import { Heading } from '@chirpy/components';
import { Link } from '@chirpy/components';
import { List } from '@chirpy/components';
import { Menu } from '@chirpy/components';
import { Text } from '@chirpy/components';
import { useToast } from '@chirpy/components';
import { useDeleteProjectByPkMutation } from '@chirpy/graphql/generated/project';
import { UserDashboardProjectsQuery } from '@chirpy/graphql/generated/user';
import { listHoverable } from '@chirpy/styles/common';
import { dayjs } from '../utilities/date';

import { IntegrateGuide } from '../integrate-guide';
import { PageViewStats } from './page-view-stats';

export type ProjectCardProps = {
  project: NonNullable<UserDashboardProjectsQuery['userByPk']>['projects'][number];
  onDeletedProject: () => void;
};

export function ProjectCard({ project, onDeletedProject }: ProjectCardProps): JSX.Element {
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
  const [{ fetching: loading }, deleteProjectByPkMutation] = useDeleteProjectByPkMutation();
  const { showToast } = useToast();
  const handleClickConfirmDelete = async () => {
    try {
      await deleteProjectByPkMutation({
        id: deletingProjectId,
      });
      setDeletingProjectId('');
      setDeletingProject('');
      onDeletedProject();
    } catch (error) {
      console.error(error);
      showToast({
        type: 'error',
        title: 'Sorry, something went wrong in our side, please try again later.',
      });
    }
  };
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
    <Card as="section" key={project.id} className="pt-4 space-y-4">
      <div className="flex justify-between flex-nowrap flex-row items-center space-x-2 pl-6 pr-3">
        <Heading as="h3">{project.name}</Heading>
        <div className="flex flex-row items-center space-x-2">
          <PageViewStats domain={project.domain} />
          <Menu className="mr-1">
            <Menu.Button ariaLabel="Show more project options">
              <span className="p-1">
                <MoreVertical size={20} />
              </span>
            </Menu.Button>
            <Menu.Items>
              <Menu.Item
                onClick={() => handleClickDeleteProjectMenu(project.id, project.name)}
                className="space-x-1"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
      <Text className="px-6" variant="secondary">
        {project.domain}
      </Text>
      <div className="px-6 flex flex-row space-x-2">
        <Link href={`/theme/${project.domain}`} variant="plain" tabIndex={-1}>
          <Button color="primary" shadow={false} className="px-2 py-1">
            Theme
          </Button>
        </Link>
        <IntegrateGuide domain={project.domain} />
      </div>
      {pages.length > 0 ? (
        <div>
          <List className="px-4">
            {pages.map((page) => (
              <List.Item key={page.id} className={listHoverable}>
                <Link
                  href={page.url}
                  title={page.title || page.url}
                  variant="plain"
                  className="inline-block max-w-xs text-ellipsis overflow-hidden whitespace-nowrap"
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
              className="text-primary-900 hover:bg-primary-900 hover:text-white rounded px-2 py-1 ml-4"
            >
              {!isExpanded ? 'Show more' : 'Show less'}
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
          Created {dayjs(project.createdAt).fromNow()}
        </Text>
      </div>
      <Dialog
        type="Alert"
        title={
          <>
            Delete the project <span className="font-bold">{deletingProjectName}</span>
          </>
        }
        show={!!deletingProjectName}
        onClose={handleCloseDialog}
      >
        <Text>
          All of your project data will be deleted permanently. This action cannot be undone.
        </Text>
        <Dialog.Footer>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="solid" color="red" onClick={handleClickConfirmDelete} disabled={loading}>
            {loading ? <Loader /> : 'Delete'}
          </Button>
        </Dialog.Footer>
      </Dialog>
    </Card>
  );
}
