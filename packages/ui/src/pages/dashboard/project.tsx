import { RouterOutputs, trpcClient } from '@chirpy-dev/trpc/src/client';
import { DehydratedState } from '@tanstack/react-query';
import clsx from 'clsx';
import * as React from 'react';

import { PageTitle, SiteLayout } from '../../blocks';
import { Heading, IconMessageSquare, Link, Text } from '../../components';
import { listHoverable } from '../../styles/common';

export type ProjectProps = {
  domain: string;
  trpcState: DehydratedState;
  project: RouterOutputs['project']['byDomain'];
};

export function Project(props: ProjectProps): JSX.Element {
  const { data: project } = trpcClient.project.byDomain.useQuery(props.domain);
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
                  'flex items-center justify-between px-4 py-3',
                )}
              >
                <Link
                  href={page.url}
                  variant="plain"
                  className={clsx(listHoverable, 'inline-block max-w-sm')}
                >
                  {page.title || page.url}
                </Link>
                <Link href={url.href} variant="plain">
                  <IconMessageSquare size={20} className="text-secondary" />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </SiteLayout>
  );
}
