import * as React from 'react';

import { Role, useCreateProjectMutation } from '$/generated/graphql';
import { useCurrentUser } from '$/hooks/useCurrentUser';
import { Button } from '$/components/Button';
import { List } from '$/components/List';
import { Heading } from '$/components/Heading';
import { Dialog, DialogFooter } from '$/components/Dialog';
import { Textfield } from '$/components/TextField';
import { useRouter } from 'next/router';
import { Toggle } from '$/components/Toggle';
import { Select } from '$/components/Select';

export default function Dashboard(): JSX.Element {
  const { data, isLogin } = useCurrentUser();
  const [
    createProjectMutation,
    { data: createProjectData, loading, error },
  ] = useCreateProjectMutation();
  const handleCreateProject = React.useCallback(() => {
    setShowDialog(true);
  }, [createProjectMutation, data?.currentUser.id]);
  const [showDialog, setShowDialog] = React.useState(false);
  const handleSubmit = () => {
    console.log('submit');
    if (data?.currentUser.id) {
      // createProjectMutation({
      //   variables: {
      //     projectName: 'test',
      //     teamName: 'test',
      //     teamRole: Role.Admin,
      //     userId: data?.currentUser.id,
      //   },
      // });
    }
  };
  const [shouldCreateTeam, setShouldCreateTeam] = React.useState(true);
  const handleToggleCreateTeam = React.useCallback((checked: boolean) => {
    setShouldCreateTeam(checked);
  }, []);
  const handleCloseDialog = React.useCallback(() => {
    setShowDialog(false);
  }, []);
  const [selectedTeam, setSelectedTeam] = React.useState('1');
  const [projectName, setProjectName] = React.useState('');
  const [teamName, setTeamName] = React.useState('');
  const handleChangeProjectName = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setProjectName(event.target.value);
    },
    [],
  );
  const handleChangeTeamName = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  }, []);

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
      {data?.currentUser?.members?.length ? (
        <List variant="unordered">
          {data.currentUser.members.map((member) => (
            <List.Item key={member.teamId}>
              {member.teamId}, {member.role}
            </List.Item>
          ))}
        </List>
      ) : (
        ''
      )}
      <Button onClick={handleCreateProject}>Create a new project</Button>
      <Dialog show={showDialog} title="Create a new project">
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <Textfield
            placeholder="Project name"
            label="Project name"
            value={projectName}
            onChange={handleChangeProjectName}
          />
          <Toggle
            enabled={shouldCreateTeam}
            label="Create or connect a team?"
            onChange={handleToggleCreateTeam}
          />
          {shouldCreateTeam ? (
            <>
              <Textfield
                type="text"
                placeholder="Team name"
                label="Team name"
                value={teamName}
                onChange={handleChangeTeamName}
              />
              <Textfield type="email" placeholder="Email" label="Add new member(s)" />
            </>
          ) : (
            <Select
              label="Connect team"
              options={['1', '2', '3']}
              value={selectedTeam}
              onChange={setSelectedTeam}
            />
          )}

          <DialogFooter>
            <Button variant="secondary" onClick={handleCloseDialog} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </main>
  );
}
