import * as React from 'react';

import {
  PageTitleDeprecated,
  EmptyProjectCard,
  ProjectCard,
  SiteCard,
} from '../../../blocks';
import { Heading, Spinner } from '../../../components';
import { useCurrentUser } from '../../../contexts';
import { trpcClient } from '../../../utilities/trpc-client';
import { AppLayout } from '../components/app-layout';
import { CreateProjectButton } from './create-button';
import { CreateProjectDialog } from './create-project-dialog';

export function Dashboard(): JSX.Element {
  const { loading: userIsLoading } = useCurrentUser();
  const {
    data: projects,
    refetch: fetchUserProjects,
    isFetching: isFetchingProject,
  } = trpcClient.project.all.useQuery();
  const { data: sites, isFetching: isFetchingSites } =
    trpcClient.site.all.useQuery();
  const [showProjectDialog, setShowProjectDialog] = React.useState(false);

  return (
    <AppLayout title="Dashboard">
      <section className="space-y-10">
        <div className="flex flex-col items-start space-y-5 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
          <PageTitleDeprecated>Dashboard</PageTitleDeprecated>
          <CreateProjectButton
            projectCount={projects?.length}
            onClickCreateProject={() => setShowProjectDialog(true)}
          />
        </div>
        <div>
          <Heading as="h4" className="mb-4 font-semibold">
            My projects
          </Heading>
          {projects?.length ? (
            <div className="flex flex-row">
              <ul className="flex-1 space-y-6">
                {projects.map((project) => (
                  <li key={project.id}>
                    <ProjectCard
                      project={project}
                      onDeletedProject={fetchUserProjects}
                    />
                  </li>
                ))}
              </ul>
              <div className="flex-1" />
            </div>
          ) : isFetchingProject || userIsLoading ? (
            <Spinner />
          ) : (
            <div className="py-6">
              <EmptyProjectCard />
            </div>
          )}
        </div>
        <div>
          <Heading as="h4" className="mb-4 font-semibold">
            My sites
          </Heading>
          {sites?.length ? (
            <div className="flex flex-row">
              <ul className="flex-1 space-y-6">
                {sites.map((project) => (
                  <li key={project.id}>
                    <SiteCard site={project} />
                  </li>
                ))}
              </ul>
              <div className="flex-1" />
            </div>
          ) : isFetchingSites || userIsLoading ? (
            <Spinner />
          ) : (
            <div className="py-6">
              <EmptyProjectCard />
            </div>
          )}
        </div>
      </section>
      <CreateProjectDialog
        show={showProjectDialog}
        onDismiss={() => setShowProjectDialog(false)}
        onSubmit={() => {
          setShowProjectDialog(false);
          fetchUserProjects();
        }}
      />
    </AppLayout>
  );
}
