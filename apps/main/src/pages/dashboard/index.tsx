import * as React from 'react';

import {
  SiteLayout,
  PageTitle,
  EmptyProjectCard,
  ProjectCard,
  Button,
  Dialog,
  IconPlusCircle,
  Spinner,
  TextField,
  useCurrentUser,
} from 'ui';
import {
  useInsertOneProjectMutation,
  useUserDashboardProjectsQuery,
} from '@chirpy-dev/graphql';
import { useForm } from 'ui';
import { isENVProd } from 'utils';
import { isValidDomain } from 'ui';

type FormFields = {
  name: string;
  domain: string;
};

export default function Dashboard(): JSX.Element {
  const {
    data: { id },
    loading: userLoading,
  } = useCurrentUser();

  const [{ data, fetching: projectLoading }, fetchUserProjects] =
    useUserDashboardProjectsQuery({
      variables: {
        id: id || '-1',
      },
      pause: !id,
    });
  const fetchProjects = React.useCallback(
    (options?: Parameters<typeof fetchUserProjects>[0]) => {
      if (!id) return;
      fetchUserProjects({
        ...options,
      });
    },
    [id, fetchUserProjects],
  );
  const { projects } = data?.userByPk || {};

  const [{}, insertProjectMutation] = useInsertOneProjectMutation();
  const handleCreateProject = React.useCallback(() => {
    setShowDialog(true);
  }, []);
  const [showDialog, setShowDialog] = React.useState(false);

  const handleCloseDialog = React.useCallback(() => {
    setShowDialog(false);
  }, []);
  const { register, errors, handleSubmit, hasError } = useForm<FormFields>({
    defaultValues: {
      name: '',
      domain: '',
    },
  });
  const handleClickSubmit = handleSubmit(
    React.useCallback(
      async (fields, _event: unknown): Promise<void> => {
        await insertProjectMutation({
          // TODO: Team id?
          name: fields.name,
          domain: fields.domain,
        });
        setShowDialog(false);
        fetchProjects();
      },
      [insertProjectMutation, fetchProjects],
    ),
  );
  const disableCreation = isENVProd && (projects?.length || 0) > 0;

  return (
    <SiteLayout title="Dashboard">
      <section className="space-y-10">
        <div className="flex flex-col items-start space-y-5 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
          <PageTitle>Dashboard</PageTitle>
          <Button
            onClick={handleCreateProject}
            variant="solid"
            color="primary"
            className="space-x-1"
            disabled={disableCreation}
          >
            <IconPlusCircle size={18} />
            <span>Create project</span>
          </Button>
        </div>
        {projects?.length ? (
          <div className="flex flex-row">
            <ul className="flex-1 space-y-6" aria-label="Project list">
              {projects.map((project) => (
                <li key={project.id}>
                  <ProjectCard
                    project={project}
                    onDeletedProject={fetchProjects}
                  />
                </li>
              ))}
            </ul>
            <div className="flex-1" />
          </div>
        ) : projectLoading || userLoading ? (
          <Spinner />
        ) : (
          <div className="py-6">
            <EmptyProjectCard />
          </div>
        )}
      </section>
      <Dialog show={showDialog} title="New project" onClose={handleCloseDialog}>
        <Dialog.Body>
          <form className="flex w-80 flex-col space-y-4">
            <TextField
              {...register('name', {
                required: { value: true, message: 'Name is required' },
                pattern: {
                  value: /^\w+$/,
                  message: `Only word characters are allowed`,
                },
                minLength: { value: 3, message: 'At least 3 characters' },
                maxLength: { value: 16, message: 'At most 16 characters' },
              })}
              aria-label="Name of this project"
              label="Name"
              errorMessage={errors.name}
              placeholder="swift"
              className="w-full"
            />
            <TextField
              {...register('domain', {
                required: { value: true, message: 'Domain is required' },
                pattern: {
                  value: isValidDomain,
                  message: 'Invalid domain',
                },
              })}
              label="Domain"
              hintText="Associate your domain with this project"
              errorMessage={errors.domain}
              placeholder="example.com"
              className="w-full"
            />
          </form>
        </Dialog.Body>
        <Dialog.Footer>
          <Button onClick={handleCloseDialog} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button
            className="w-full sm:w-auto"
            disabled={hasError}
            color="primary"
            variant="solid"
            onClick={handleClickSubmit}
          >
            Create
          </Button>
        </Dialog.Footer>
      </Dialog>
    </SiteLayout>
  );
}
