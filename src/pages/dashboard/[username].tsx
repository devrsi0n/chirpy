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
import { useForm } from '$/hooks/useForm';
import { getAdminApollo } from '$/server/common/admin-apollo';
import {
  ProjectsOfDashboardDocument,
  ProjectsOfDashboardQuery,
} from '$/server/graphql/generated/project';
import { AllUsersDocument } from '$/server/graphql/generated/user';
import { getStartOfSubtractDate, dayjs } from '$/utilities/date';

type FormFields = {
  name: string;
  domain: string;
};

export default function Dashboard({ projects }: DashboardProps): JSX.Element {
  const { data, isLogin, refetchData } = useCurrentUser();

  const [insertProjectMutation, { loading }] = useInsertOneProjectMutation();
  const handleCreateProject = React.useCallback(() => {
    setShowDialog(true);
  }, []);
  const [showDialog, setShowDialog] = React.useState(false);

  const handleCloseDialog = React.useCallback(() => {
    setShowDialog(false);
  }, []);
  const { register, errors, handleSubmit } = useForm<FormFields>({
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
            userId: data.id,
          },
        });
        setShowDialog(false);
        refetchData?.();
      },
      [insertProjectMutation, data, refetchData],
    ),
  );

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
    return () => clearTimeout(timeout.current);
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
          <form tw="flex flex-col w-full" onSubmit={handleClickSubmit}>
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

            <DialogFooter tw="space-x-3">
              <Button variant="text" onClick={handleCloseDialog} tw="w-full sm:w-auto">
                Cancel
              </Button>
              <Button
                tw="w-full sm:w-auto"
                disabled={Object.values(errors).some((error) => error.length > 0) || loading}
                variant="plain"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
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
