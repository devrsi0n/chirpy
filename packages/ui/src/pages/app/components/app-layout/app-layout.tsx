import * as React from 'react';

import { LayoutTitle } from '../../../../blocks';
import { SiteThemeProvider } from '../../../../contexts';
import { trpcClient } from '../../../../utilities';
import { HeaderNav } from './header-nav';
import { Sidebar } from './sidebar';

export type AppLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export function AppLayout(props: AppLayoutProps): JSX.Element {
  const { data: sites } = trpcClient.site.all.useQuery();
  return (
    <SiteThemeProvider>
      <LayoutTitle title={props.title} />
      {/* Render Sidebar on desktop view, render HeaderNav on mobile view */}
      <Sidebar sites={sites}>{props.children}</Sidebar>
      <HeaderNav sites={sites}>{props.children}</HeaderNav>
    </SiteThemeProvider>
  );
}
