import * as React from 'react';

import { PageTitle, SiteCard } from '../../../blocks';
import { EmptySiteCard } from '../../../blocks/site-card/empty-site-card';
import { Heading, Spinner } from '../../../components';
import { useCurrentUser } from '../../../contexts';
import { trpcClient } from '../../../utilities/trpc-client';
import { AppLayout } from '../components/app-layout';
import { CreateProjectDialog } from './create-project-dialog';

export function DashboardHome(): JSX.Element {
  const { loading: userIsLoading } = useCurrentUser();
  const { refetch: fetchUserProjects } = trpcClient.project.all.useQuery();
  const { data: sites, isFetching: isFetchingSites } =
    trpcClient.site.all.useQuery();
  const { data } = useCurrentUser();
  const [showProjectDialog, setShowProjectDialog] = React.useState(false);

  return (
    <AppLayout title="Dashboard">
      <section>
        <div className="flex flex-col items-start space-y-5 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
          <PageTitle>Welcome back, {data.name}</PageTitle>
        </div>

        <div>
          <Heading as="h4" className="mb-4 !text-lg font-semibold">
            All sites
          </Heading>
          {sites?.length ? (
            <ul className="flex flex-col flex-wrap gap-6 md:flex-row">
              <EmptySiteCard />
              {sites.map((project) => (
                <li key={project.id}>
                  <SiteCard site={project} />
                </li>
              ))}
            </ul>
          ) : (
            isFetchingSites || (userIsLoading && <Spinner />)
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
