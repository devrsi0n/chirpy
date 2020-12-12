import * as React from 'react';

import { Button } from '$/components/buttons/Button';
import { Link } from '../components/Link';
import { Popover } from './Popover';
import { useRouter } from 'next/router';
import { Heading } from './Heading';
import { Avatar } from './Avatar';
import { Text } from './Text';
import { layoutStyle } from './styles';
import { useCurrentUser } from '$/hooks/useCurrentUser';
import { Select } from './Select';
import { CurrentUserQuery } from '$/generated/graphql';
import { SlashIcon } from './Icons/Slash.Icon';

const SELECTED_PROJECT_ID = 'SELECTED_PROJECT_ID';
type Project = NonNullable<CurrentUserQuery['currentUser']>['projects'][number];

export function Header(): JSX.Element {
  const { data, error, loading } = useCurrentUser();
  const [selectedProject, setSelectedProject] = React.useState<Project>();
  React.useEffect(() => {
    if (data?.currentUser?.projects?.length && !selectedProject) {
      const lastSelectedProject = localStorage.getItem(SELECTED_PROJECT_ID);
      setSelectedProject(
        data.currentUser.projects.filter((project) => project.id === lastSelectedProject)[0] ||
          data.currentUser.projects[0],
      );
    }
  }, [data?.currentUser?.projects, selectedProject]);
  const handleSelectProject = React.useCallback(
    (projectID: string) => {
      setSelectedProject(
        data?.currentUser?.projects?.filter((project) => project.id === projectID)[0],
      );
      localStorage.setItem(SELECTED_PROJECT_ID, projectID);
    },
    [data?.currentUser?.projects],
  );

  const router = useRouter();
  const handleClick = React.useCallback(() => {
    router.push('/api/auth/logout');
  }, [router]);
  if (error) {
    console.error('Get current user error: ', error);
  }
  return (
    <header className="sm:sticky sm:top-0 sm:left-0 header w-full border-b border-divider transition duration-150 sm:z-20 py-2">
      <div className="layout mx-auto">
        <section className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center space-x-2">
            <Heading as="h3" className="flex items-center font-bold">
              <Link href="/">ZOO</Link>
            </Heading>
            {!!data?.currentUser?.projects?.length && selectedProject && (
              <>
                <SlashIcon className="text-gray-400" />
                <Select
                  value={selectedProject?.id}
                  name={selectedProject?.name}
                  onChange={handleSelectProject}
                  className="w-32 sm:w-40"
                >
                  {data?.currentUser?.projects.map((project: Project) => (
                    <Select.Option key={project.id} value={project.id}>
                      {project.name}
                    </Select.Option>
                  ))}
                </Select>
              </>
            )}
          </div>
          <nav className="flex flex-row items-center h-full">
            {loading && <Text>Loading...</Text>}
            {data?.currentUser?.avatar ? (
              <Popover
                content={
                  <Button variant="borderless" onClick={handleClick}>
                    Logout
                  </Button>
                }
              >
                <figure>
                  <Avatar src={data.currentUser.avatar} alt="The avatar of current user" />
                </figure>
              </Popover>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </nav>
        </section>
      </div>
      <style jsx>
        {`
          .header {
            backdrop-filter: blur(10px);
          }
        `}
      </style>
      <style jsx>{layoutStyle}</style>
    </header>
  );
}
