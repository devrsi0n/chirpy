import { trpcClient } from '@chirpy-dev/trpc/src/client';
import { DehydratedState } from '@tanstack/react-query';
import clsx from 'clsx';
import * as React from 'react';

import { PageTitle, SiteLayout } from '../../blocks';
import { Heading, IconMessageSquare, Link, Text } from '../../components';
import { useCurrentUser } from '../../contexts';
import { listHoverable } from '../../styles/common';

export type ProjectProps = {
  domain: string;
  trpcState: DehydratedState;
};

export function Project(props: ProjectProps): JSX.Element {
  const { data: project } = trpcClient.project.byDomain.useQuery(props.domain);
  const { data: user } = useCurrentUser();
  return (
    <SiteLayout title="Project">
      <PageTitle>{project?.name}</PageTitle>
      <section className="mt-6 space-y-4">
        <Heading>Pages</Heading>
        <Text variant="secondary">All pages that have a comment widget</Text>
        <ul className="rounded border">
          {project?.pages.map((page, index) => {
            const url = new URL(page.url);
            url.hash = 'chirpy-comment';
            return (
              <li
                key={page.id}
                className={clsx(
                  index !== project.pages.length - 1 && 'border-b',
                  'flex items-center justify-between gap-4 px-4 py-3',
                )}
              >
                <Link
                  href={page.url}
                  variant="plain"
                  className={clsx(listHoverable, 'flex flex-col')}
                >
                  <span className="font-bold">{page.title}</span>
                  <span className="text-sm">{page.url}</span>
                </Link>
                <Link
                  href={url.href}
                  variant="plain"
                  className="rounded-full p-2 hover:bg-gray-300"
                >
                  <IconMessageSquare
                    size={20}
                    className="text-secondary -scale-x-1"
                  />
                </Link>
              </li>
            );
          })}
          {!project?.pages.length && (
            <li className="px-4 py-3">
              No pages found,{' '}
              <Link
                href={`/dashboard/${user.username}/${project?.domain}/getting-started`}
                variant="primary"
              >
                get started
              </Link>
            </li>
          )}
        </ul>
      </section>
    </SiteLayout>
  );
}
