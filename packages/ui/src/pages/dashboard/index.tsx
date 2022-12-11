import * as React from 'react';

import {
  SiteLayout,
  PageTitle,
  EmptyProjectCard,
  ProjectCard,
} from '../../blocks';
import { Spinner } from '../../components';
import { useCurrentUser } from '../../contexts';
import { trpcClient } from '../../utilities/trpc-client';
import { CreateProjectButton } from './create-button';
import { CreateProjectDialog } from './create-project-dialog';
import { CreateSiteDialog } from './create-site-dialog';

export function Dashboard(): JSX.Element {
  const { loading: userIsLoading } = useCurrentUser();
  const {
    data: projects,
    refetch: fetchUserProjects,
    isFetching,
  } = trpcClient.project.all.useQuery();

  const [showProjectDialog, setShowProjectDialog] = React.useState(false);
  const [showSiteDialog, setShowSiteDialog] = React.useState(false);

  return (
    <SiteLayout title="Dashboard">
      <section className="space-y-10">
        <div className="flex flex-col items-start space-y-5 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
          <PageTitle>Dashboard</PageTitle>
          <CreateProjectButton
            projectCount={projects?.length}
            onClickCreateProject={() => setShowProjectDialog(true)}
            onClickCreateSite={() => setShowSiteDialog(true)}
          />
        </div>
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
        ) : isFetching || userIsLoading ? (
          <Spinner />
        ) : (
          <div className="py-6">
            <EmptyProjectCard />
          </div>
        )}
      </section>
      <CreateProjectDialog
        show={showProjectDialog}
        onDismiss={() => setShowProjectDialog(false)}
        onSubmit={() => {
          setShowProjectDialog(false);
          fetchUserProjects();
        }}
      />
      <CreateSiteDialog
        show={showSiteDialog}
        onDismiss={() => setShowSiteDialog(false)}
        onSubmit={() => {
          setShowSiteDialog(false);
          fetchUserProjects();
        }}
      />
    </SiteLayout>
  );
}
