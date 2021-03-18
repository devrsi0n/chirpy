import * as React from 'react';
import Head from 'next/head';

import { useInsertOneProjectMutation } from '$/graphql/generated/project';
import { useCurrentUser } from '$/hooks/useCurrentUser';
import { Button } from '$/components/Button';
import { List } from '$/components/List';
import { Heading } from '$/components/Heading';
import { Dialog, DialogFooter } from '$/components/Dialog';
import { TextField } from '$/components/TextField';
import { useRouter } from 'next/router';
import { Text } from '$/components/Text';
import { Layout } from '$/components/Layout';

export default function Dashboard(): JSX.Element {
  const { id, projects, isLogin, refetch } = useCurrentUser();
  const [insertProjectMutation] = useInsertOneProjectMutation();
  const handleCreateProject = React.useCallback(() => {
    setShowDialog(true);
  }, []);
  const [showDialog, setShowDialog] = React.useState(false);

  const handleCloseDialog = React.useCallback(() => {
    setShowDialog(false);
  }, []);
  const [projectName, setProjectName] = React.useState('');
  const [projectNameError, setProjectNameError] = React.useState('');
  const handleChangeProjectName = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (value.length > 64) {
        setProjectNameError('64 characters at most.');
      } else {
        setProjectNameError('');
      }
      setProjectName(value);
    },
    [],
  );
  const handleSubmit = React.useCallback(() => {
    insertProjectMutation({
      variables: {
        // TODO: Team id?
        name: projectName,
        userId: id!,
      },
    }).then((data) => {
      setShowDialog(false);
      refetch?.();
      return data;
    });
  }, [projectName, insertProjectMutation, id, refetch]);

  const router = useRouter();
  const timeout = React.useRef<number>();
  React.useEffect(() => {
    if (!isLogin) {
      timeout.current = window.setTimeout(() => {
        router.push('/sign-in');
      }, 3000);
    } else {
      timeout.current && clearTimeout(timeout.current);
    }
  }, [router, isLogin]);

  if (!isLogin) {
    return (
      <div>
        <Heading as="h3">You are not sign-in, redirecting to sign-in page</Heading>
      </div>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main>
        <Heading as="h2">Welcome to dashboard.</Heading>
        <Text>userId - {id}</Text>
        {projects?.length ? (
          <List variant="unordered">
            {projects.map((project) => (
              <List.Item key={project.id}>
                {project.id} - {project.name}
              </List.Item>
            ))}
          </List>
        ) : (
          <div tw="py-6">
            <Text>No projects</Text>
          </div>
        )}
        <div tw="space-x-2">
          <Button onClick={handleCreateProject}>Create a new project</Button>
          <Button tw="mt-5">Integrate comment</Button>
        </div>
        <Dialog show={showDialog} title="Create a new project">
          <div tw="flex flex-col w-full">
            <TextField
              placeholder="Project name"
              label="Project name"
              value={projectName}
              onChange={handleChangeProjectName}
              errorMessage={projectNameError}
            />

            <DialogFooter>
              <Button variant="plain" onClick={handleCloseDialog} tw="w-full sm:w-auto">
                Cancel
              </Button>
              <Button
                tw="w-full sm:w-auto"
                disabled={projectNameError.length > 0}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </DialogFooter>
          </div>
        </Dialog>
      </main>
    </Layout>
  );
}
