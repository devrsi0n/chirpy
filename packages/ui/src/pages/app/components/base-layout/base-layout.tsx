import * as React from 'react';

import { LayoutTitle } from '../../../../blocks';
import { SiteThemeProvider } from '../../../../contexts';

export type BaseLayoutProps = {
  children: React.ReactNode;
  title: string;
  sidebar: React.ReactNode;
  mobileHeader: React.ReactNode;
};

export function BaseLayout(props: BaseLayoutProps): JSX.Element {
  return (
    <SiteThemeProvider>
      <LayoutTitle title={props.title} />
      {/* Render Sidebar on desktop view, render MobileHeader on mobile view */}
      <div className="hidden h-full flex-row md:flex">
        {props.sidebar}
        <main className="flex-1 p-8">{props.children}</main>
      </div>
      <div className="block h-full md:hidden">{props.mobileHeader}</div>
    </SiteThemeProvider>
  );
}
