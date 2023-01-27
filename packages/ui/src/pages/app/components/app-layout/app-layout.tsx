import * as React from 'react';

import { trpcClient } from '../../../../utilities';
import { BaseLayout } from '../base-layout';
import { MobileHeader } from './mobile-header';
import { Sidebar } from './sidebar';

export type AppLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export function AppLayout(props: AppLayoutProps): JSX.Element {
  const { data: sites } = trpcClient.site.all.useQuery();
  return (
    <BaseLayout
      title={props.title}
      sidebar={<Sidebar sites={sites} />}
      mobileHeader={
        <MobileHeader sites={sites}>
          <main className="h-full p-4">{props.children}</main>
        </MobileHeader>
      }
    >
      {props.children}
    </BaseLayout>
  );
}
