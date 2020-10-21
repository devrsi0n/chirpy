import * as React from 'react';

import { Role, useCreateOneProjectMutation } from '$/generated/graphql';
import { useCurrentUser } from '$/hooks/useCurrentUser';
import { Button } from '$/components/Button';
import { List } from '$/components/List';
import { Heading } from '$/components/Heading';
import { Dialog, DialogFooter } from '$/components/Dialog';
import { Textfield } from '$/components/TextField';
import { useRouter } from 'next/router';
import { Toggle } from '$/components/Toggle';
import { Select } from '$/components/Select';
import { Text } from '$/components/Text';

export default function Dashboard(): JSX.Element {
  const { data, isLogin, refetch } = useCurrentUser();
  const [createProjectMutation] = useCreateOneProjectMutation();
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
    createProjectMutation({
      variables: {
        projectName,
        userID: data!.currentUser!.id!,
      },
    }).then((data) => {
      setShowDialog(false);
      refetch?.();
      return data;
    });
  }, [projectName, createProjectMutation, data, refetch]);

  const router = useRouter();
  React.useEffect(() => {
    if (!isLogin) {
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  }, [router, isLogin]);

  if (!isLogin) {
    return (
      <div>
        <Heading as="h3">You are not login, redirecting to login page</Heading>
      </div>
    );
  }
  return (
    <main>
      <Heading as="h2">Welcome to dashboard.</Heading>
      {data?.currentUser?.projects?.length ? (
        <List variant="unordered">
          {data.currentUser.projects.map((project) => (
            <List.Item key={project.id}>
              {project.id} - {project.name}
            </List.Item>
          ))}
        </List>
      ) : (
        <div className="py-6">
          <Text>No projects</Text>
        </div>
      )}
      <Button onClick={handleCreateProject}>Create a new project</Button>
      <Dialog show={showDialog} title="Create a new project">
        <div className="flex flex-col w-full">
          <Textfield
            placeholder="Project name"
            label="Project name"
            value={projectName}
            onChange={handleChangeProjectName}
            errorMessage={projectNameError}
          />

          <DialogFooter>
            <Button variant="secondary" onClick={handleCloseDialog} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              className="w-full sm:w-auto"
              disabled={!!projectNameError.length}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </DialogFooter>
        </div>
      </Dialog>
    </main>
  );
}
