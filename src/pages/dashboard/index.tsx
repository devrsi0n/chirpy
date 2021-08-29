import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { useCurrentUser } from '$/blocks/CurrentUserProvider/useCurrentUser';
import { ProjectCard } from '$/blocks/ProjectCard';
import { Button } from '$/components/Button';
import { Dialog, DialogFooter } from '$/components/Dialog';
import { Heading } from '$/components/Heading';
import { Text } from '$/components/Text';
import { TextField } from '$/components/TextField';
import { useInsertOneProjectMutation } from '$/graphql/generated/project';
import { useUserDashboardProjectsLazyQuery } from '$/graphql/generated/user';
import { useForm } from '$/hooks/useForm';
import { getStartOfSubtractDate, dayjs } from '$/utilities/date';

type FormFields = {
  name: string;
  domain: string;
};

export default function Dashboard(): JSX.Element {
  const {
    data: { id },
  } = useCurrentUser();

  const [fetchUserProjects, { data }] = useUserDashboardProjectsLazyQuery();
  const handleFetchProjects = React.useCallback(() => {
    if (!id) return;
    fetchUserProjects({
      variables: {
        id: id!,
        today: dayjs().toISOString(),
        yesterday: getStartOfSubtractDate(1),
        twoDaysAgo: getStartOfSubtractDate(2),
      },
    });
  }, [id, fetchUserProjects]);
  React.useEffect(handleFetchProjects, [handleFetchProjects]);
  const { projects } = data?.userByPk || {};

  const [insertProjectMutation, { loading }] = useInsertOneProjectMutation();
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
            userId: id,
          },
        });
        setShowDialog(false);
        handleFetchProjects();
      },
      [insertProjectMutation, id, handleFetchProjects],
    ),
  );

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="main-container">
        <section tw="py-10 space-y-10">
          <div tw="space-x-2 flex flex-row justify-between items-center">
            <Heading as="h2" tw="text-3xl text-gray-600 font-semibold">
              Dashboard
            </Heading>
            <Button onClick={handleCreateProject} variant="solid" color="primary">
              New project
            </Button>
          </div>
          {projects?.length ? (
            <div tw="flex flex-row">
              <div tw="space-y-6 flex-1">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onDeletedProject={handleFetchProjects}
                  />
                ))}
              </div>
              <div tw="flex-1" />
            </div>
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
              placeholder="hippo"
              tw="w-full text-gray-600"
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
                  <Text tw="text-gray-500" variant="sm">
                    Associate a domain with this project
                  </Text>
                </>
              }
              errorMessage={errors.domain}
              placeholder="example.com"
              tw="w-full"
            />
          </form>
          <DialogFooter>
            <Button variant="plain" onClick={handleCloseDialog} tw="w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              tw="w-full sm:w-auto"
              disabled={hasError || loading}
              variant="plain"
              color="primary"
              onClick={handleClickSubmit}
            >
              Submit
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </>
  );
}

Dashboard.auth = true;
