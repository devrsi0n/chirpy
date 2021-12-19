import PlusCircle from '@geist-ui/react-icons/plusCircle';
import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { PageTitle } from '$/blocks/PageTitle';
import { ProjectCard } from '$/blocks/ProjectCard';
import { Button } from '$/components/Button';
import { Dialog } from '$/components/Dialog';
import { Spinner } from '$/components/Spinner';
import { Text } from '$/components/Text';
import { TextField } from '$/components/TextField';
import { useCurrentUser } from '$/contexts/CurrentUserProvider/useCurrentUser';
import { useInsertOneProjectMutation } from '$/graphql/generated/project';
import { useUserDashboardProjectsLazyQuery } from '$/graphql/generated/user';
import { useForm } from '$/hooks/useForm';

type FormFields = {
  name: string;
  domain: string;
};

export default function Dashboard(): JSX.Element {
  const {
    data: { id },
    loading: userLoading,
  } = useCurrentUser();

  const [fetchUserProjects, { data, loading: projectLoading }] = useUserDashboardProjectsLazyQuery({
    fetchPolicy: 'cache-and-network',
  });
  const fetchProjects = React.useCallback(
    (options?: Parameters<typeof fetchUserProjects>[0]) => {
      if (!id) return;
      fetchUserProjects({
        ...options,
        variables: {
          id: id!,
        },
      });
    },
    [id, fetchUserProjects],
  );
  React.useEffect(fetchProjects, [fetchProjects]);
  const { projects } = data?.userByPk || {};

  const [insertProjectMutation, { loading: loadingInsertProject }] = useInsertOneProjectMutation();
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
          variables: {
            // TODO: Team id?
            name: fields.name,
            domain: fields.domain,
          },
        });
        setShowDialog(false);
        fetchProjects();
      },
      [insertProjectMutation, id, fetchProjects],
    ),
  );

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <section tw="space-y-10">
        <div tw="space-x-2 flex flex-row justify-between items-start">
          <PageTitle>Dashboard</PageTitle>
          <Button onClick={handleCreateProject} variant="solid" color="primary" tw="space-x-1">
            <PlusCircle size={18} />
            <span>Create project</span>
          </Button>
        </div>
        {projects?.length ? (
          <div tw="flex flex-row">
            <ul tw="space-y-6 flex-1" aria-label="Project list">
              {projects.map((project) => (
                <li key={project.id}>
                  <ProjectCard project={project} onDeletedProject={fetchProjects} />
                </li>
              ))}
            </ul>
            <div tw="flex-1" />
          </div>
        ) : projectLoading || userLoading ? (
          <Spinner />
        ) : (
          <div tw="py-6">
            <Text>No projects</Text>
          </div>
        )}
      </section>
      <Dialog show={showDialog} title="New project" onClose={handleCloseDialog}>
        <form tw="flex flex-col w-80">
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
            tw="w-full"
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
            tw="w-full"
          />
        </form>
        <Dialog.Footer>
          <Button onClick={handleCloseDialog} tw="w-full sm:w-auto">
            Cancel
          </Button>
          <Button
            tw="w-full sm:w-auto"
            disabled={hasError || loadingInsertProject}
            color="primary"
            variant="solid"
            onClick={handleClickSubmit}
          >
            Submit
          </Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
}

Dashboard.auth = true;
