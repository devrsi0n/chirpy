import Loader from '@geist-ui/react-icons/loader';
import MoreVertical from '@geist-ui/react-icons/moreVertical';
import Trash2 from '@geist-ui/react-icons/trash2';
import * as React from 'react';

import { BaseButton, Button } from '$/components/button';
import { Card } from '$/components/card';
import { Dialog } from '$/components/dialog';
import { Divider } from '$/components/divider';
import { Heading } from '$/components/heading';
import { Link } from '$/components/link';
import { List } from '$/components/list';
import { Menu } from '$/components/menu';
import { Text } from '$/components/text';
import { useToast } from '$/components/toast';
import { useDeleteProjectByPkMutation } from '$/graphql/generated/project';
import { UserDashboardProjectsQuery } from '$/graphql/generated/user';
import { listHoverable } from '$/styles/common';
import { dayjs } from '$/utilities/date';

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
    <Card as="section" key={project.id} className="space-y-4 pt-4">
      <div className="flex flex-row flex-nowrap items-center justify-between space-x-2 pl-6 pr-3">
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
      <div className="flex flex-row space-x-2 px-6">
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
                  className="inline-block max-w-xs overflow-hidden text-ellipsis whitespace-nowrap"
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
