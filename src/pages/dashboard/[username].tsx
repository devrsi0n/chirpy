import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import 'twin.macro';

import { useCurrentUser } from '$/blocks/CurrentUserProvider/useCurrentUser';
import { ProjectCard } from '$/blocks/ProjectCard';
import { Button } from '$/components/Button';
import { Dialog, DialogFooter } from '$/components/Dialog';
import { Heading } from '$/components/Heading';
import { Layout } from '$/components/Layout';
import { Text } from '$/components/Text';
import { TextField } from '$/components/TextField';
import { useInsertOneProjectMutation } from '$/graphql/generated/project';
import { getAdminApollo } from '$/server/common/admin-apollo';
import {
  ProjectsOfDashboardDocument,
  ProjectsOfDashboardQuery,
} from '$/server/graphql/generated/project';
import { AllUsersDocument } from '$/server/graphql/generated/user';
import { getStartOfSubtractDate, dayjs } from '$/utilities/date';

export default function Dashboard({ projects }: DashboardProps): JSX.Element {
  const { id, isLogin, refetchData } = useCurrentUser();
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
      refetchData?.();
      return data;
    });
  }, [projectName, insertProjectMutation, id, refetchData]);

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

  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div>
        <section tw="space-y-10">
          <div tw="space-x-2 flex flex-row justify-between items-center">
            <Heading as="h1" tw="text-4xl text-gray-600">
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
                  <ProjectCard key={project.id} project={project} />
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
          <div tw="flex flex-col w-full">
            <TextField
              aria-label="Name of project"
              label="Name"
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
                variant="solid"
                color="primary"
              >
                Submit
              </Button>
            </DialogFooter>
          </div>
        </Dialog>
      </div>
    </Layout>
  );
}

type PathParam = {
  username: string;
};

export const getStaticPaths: GetStaticPaths<PathParam> = async () => {
  const client = getAdminApollo();
  const allUsers = await client.query({
    query: AllUsersDocument,
  });
  const paths = [];
  for (const u of allUsers.data.users) {
    if (!u.username) {
      continue;
    }
    paths.push({
      params: {
        username: u.username,
      },
    });
  }
  const payload = {
    paths,
    fallback: true,
  };
  return payload;
};

type DashboardProps = {
  projects: ProjectsOfDashboardQuery['projects'];
};

export const getStaticProps: GetStaticProps<DashboardProps, PathParam> = async ({ params }) => {
  if (!params?.username) {
    return { notFound: true };
  }
  const client = getAdminApollo();
  const {
    data: { projects },
  } = await client.query({
    query: ProjectsOfDashboardDocument,
    variables: {
      username: params.username,
      today: dayjs().toISOString(),
      yesterday: getStartOfSubtractDate(1),
      twoDaysAgo: getStartOfSubtractDate(2),
    },
  });

  return { props: { projects }, revalidate: 1 };
};
