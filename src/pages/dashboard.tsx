import CheckCircle from '@geist-ui/react-icons/checkCircle';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import { IntegrateGuide } from '$/blocks/IntegrateGuide';
import { Button } from '$/components/Button';
import { Dialog, DialogFooter } from '$/components/Dialog';
import { Divider } from '$/components/Divider';
import { Heading } from '$/components/Heading';
import { Layout } from '$/components/Layout';
import { Link } from '$/components/Link';
import { List } from '$/components/List';
import { Text } from '$/components/Text';
import { TextField } from '$/components/TextField';
import { useInsertOneProjectMutation } from '$/graphql/generated/project';
import { useCurrentUser } from '$/hooks/useCurrentUser';

dayjs.extend(relativeTime);

export default function Dashboard(): JSX.Element {
  const { id, projects, isLogin, refetchData } = useCurrentUser();
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

  if (!isLogin) {
    return (
      <div>
        <Heading as="h3">You are not log-in, redirecting to log-in page</Heading>
      </div>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div>
        <section tw="space-y-10">
          <div tw="space-x-2 flex flex-row justify-between items-center">
            <Heading as="h1" tw="text-4xl">
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
                  <section
                    key={project.id}
                    tw="pt-4 rounded-lg space-y-3"
                    style={{
                      boxShadow: 'rgba(0, 0, 0, 0.12) 0px 5px 10px 0px',
                    }}
                  >
                    <div tw="px-6 flex justify-start flex-nowrap flex-row items-center space-x-2">
                      <Heading tw="font-bold" as="h3">
                        {project.name}
                      </Heading>
                      <span
                        title={
                          project.pages.length > 0
                            ? 'You alread integrated this project into at least one page'
                            : 'No page integrated'
                        }
                        css={project.pages.length > 0 ? tw`text-green-500` : tw`text-gray-500`}
                      >
                        <CheckCircle size={18} />
                      </span>
                    </div>
                    <div tw="px-6 flex flex-row space-x-2">
                      <Link href={`/theme/${project.id}`} variant="plain">
                        <Button tw="" color="primary" shadow={false} size="sm">
                          Theme
                        </Button>
                      </Link>
                      <IntegrateGuide pid={project.id} />
                    </div>
                    {project.pages.length > 0 ? (
                      <List tw="px-6 space-y-1.5">
                        {project.pages.map((page) => (
                          <List.Item key={page.id} markerStyle={tw`bg-black`}>
                            <Link
                              href={page.url}
                              title={page.title || page.url}
                              variant="plain"
                              tw="hover:text-gray-700 inline-block w-72 overflow-ellipsis overflow-hidden whitespace-nowrap"
                            >
                              {page.title || page.url}
                            </Link>
                          </List.Item>
                        ))}
                      </List>
                    ) : (
                      <Text tw="px-6">No page integrated</Text>
                    )}
                    <Divider />
                    <div tw="px-6 pb-2">
                      <Text variant="sm">Created {dayjs(project.createdAt).fromNow()}</Text>
                    </div>
                  </section>
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
