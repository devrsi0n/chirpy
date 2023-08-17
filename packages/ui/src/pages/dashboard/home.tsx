import { RouterOutputs } from '@chirpy-dev/trpc/src/client';
import { useRouter } from 'next/router';

import {
  EmptyProjectCard,
  PageTitle,
  ProjectCard,
  SiteLayout,
} from '../../blocks';
import { Spinner } from '../../components';
import { useCurrentUser } from '../../contexts';
import { CreateProjectButton } from './create-project-button';

export type DashboardProps = {
  projects: RouterOutputs['project']['all'];
};

export function DashboardHome({ projects }: DashboardProps): JSX.Element {
  const { loading } = useCurrentUser();
  const router = useRouter();

  return (
    <SiteLayout title="Dashboard">
      <section className="space-y-10">
        <div className="flex flex-col items-start space-y-5 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
          <PageTitle>Dashboard</PageTitle>
          <CreateProjectButton
            projectCount={projects?.length}
            onCreateProject={() => {
              router.push(`/dashboard/project/new`);
            }}
          />
        </div>
        {projects?.length ? (
          <ul className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <li key={project.id}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        ) : loading ? (
          <Spinner />
        ) : (
          <div className="py-6">
            <EmptyProjectCard />
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
