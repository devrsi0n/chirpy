import * as React from 'react';

import { trpcClient } from '../../../../utilities';
import { MobileHeader } from '../app-layout/mobile-header';
import { Sidebar } from '../app-layout/sidebar';
import { BaseLayout, BaseLayoutProps } from '../base-layout';

export type SiteLayoutProps = Pick<BaseLayoutProps, 'children' | 'title'>;

export function SiteLayout(props: SiteLayoutProps): JSX.Element {
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
