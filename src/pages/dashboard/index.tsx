import PlusCircle from '@geist-ui/react-icons/plusCircle';
import * as React from 'react';


import { SiteLayout } from '$/blocks/layout';
import { PageTitle } from '$/blocks/page-title';
import { ProjectCard } from '$/blocks/project-card';
import { Button } from '$/components/button';
import { Dialog } from '$/components/dialog';
import { Spinner } from '$/components/spinner';
import { Text } from '$/components/text';
import { TextField } from '$/components/text-field';
import { useCurrentUser } from '$/contexts/current-user-context/use-current-user';
import { useInsertOneProjectMutation } from '$/graphql/generated/project';
import { useUserDashboardProjectsQuery } from '$/graphql/generated/user';
import { useForm } from '$/hooks/use-form';
import { isENVProd } from '$/server/utilities/env';

type FormFields = {
  name: string;
  domain: string;
};

export default function Dashboard(): JSX.Element {
  const {
    data: { id },
    loading: userLoading,
  } = useCurrentUser();

  const [{ data, fetching: projectLoading }, fetchUserProjects] = useUserDashboardProjectsQuery({
    variables: {
      id: id || '-1',
    },
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
      async (fields): Promise<void> => {
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
        <div className="space-x-2 flex flex-row justify-between items-start">
          <PageTitle>Dashboard</PageTitle>
          <Button
            onClick={handleCreateProject}
            variant="solid"
            color="primary"
            className="space-x-1"
            disabled={disableCreation}
          >
            <PlusCircle size={18} />
            <span>Create project</span>
          </Button>
        </div>
        {projects?.length ? (
          <div className="flex flex-row">
            <ul className="space-y-6 flex-1" aria-label="Project list">
              {projects.map((project) => (
                <li key={project.id}>
                  <ProjectCard project={project} onDeletedProject={fetchProjects} />
                </li>
              ))}
            </ul>
            <div className="flex-1" />
          </div>
        ) : projectLoading || userLoading ? (
          <Spinner />
        ) : (
          <div className="py-6">
            <Text>No projects</Text>
          </div>
        )}
      </section>
      <Dialog show={showDialog} title="New project" onClose={handleCloseDialog}>
        <form className="flex flex-col w-80">
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
                value:
                  /^((?!-))(xn--)?[\da-z][\d_a-z-]{0,61}[\da-z]{0,1}\.(xn--)?([\da-z\-]{1,61}|[\da-z-]{1,30}\.[a-z]{2,})$/,
                message: 'Invalid domain',
              },
            })}
            aria-label="Associate a domain with this project"
            label={
              <>
                Domain
                <Text variant="secondary" size="sm">
                  Associate a domain with this project
                </Text>
              </>
            }
            errorMessage={errors.domain}
            placeholder="example.com"
            className="w-full"
          />
        </form>
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
