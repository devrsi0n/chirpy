import * as React from 'react';

import { LayoutTitle } from '../../../../blocks';
import { SiteThemeProvider } from '../../../../contexts';
import { MobileHeader } from './mobile-header';
import { Sidebar, SidebarProps } from './sidebar';

export type AppLayoutProps = {
  children: React.ReactNode;
  title: string;
} & SidebarProps;

export function AppLayout(props: AppLayoutProps): JSX.Element {
  return (
    <SiteThemeProvider>
      <LayoutTitle title={props.title} />
      {/* Render Sidebar on desktop view, render MobileHeader on mobile view */}
      <div className="hidden h-full flex-row md:flex">
        <Sidebar subdomain={props.subdomain} />
        <main className="flex-1 overflow-scroll p-8">{props.children}</main>
      </div>
      <div className="block h-full md:hidden">
        <MobileHeader subdomain={props.subdomain}>
          <main className="h-full p-4">{props.children}</main>
        </MobileHeader>
      </div>
    </SiteThemeProvider>
  );
}
