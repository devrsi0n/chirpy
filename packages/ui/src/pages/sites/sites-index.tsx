import * as React from 'react';

import { PageTitle } from '../../blocks';
import { PostCard } from './components/post-card';
import { SitesLayout } from './sites-layout';
import { SitesPage } from './types';

export type SitesIndexProps = {
  subdomain: string;
  pages: SitesPage[];
};

export function SitesIndex(props: SitesIndexProps): JSX.Element {
  return (
    <SitesLayout>
      <PageTitle>Site {props.subdomain}</PageTitle>
      <ul>
        {props.pages.map((page) => (
          <li key={page.id}>
            <PostCard {...page} />
          </li>
        ))}
      </ul>
    </SitesLayout>
  );
}
