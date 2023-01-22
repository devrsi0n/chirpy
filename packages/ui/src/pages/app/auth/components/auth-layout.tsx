import clsx from 'clsx';
import * as React from 'react';

import { LayoutTitle } from '../../../../blocks';
import { LayoutTitleProps } from '../../../../blocks/layout/layout-wrapper';
import { SiteThemeProvider } from '../../../../contexts';

export type AuthLayoutProps = {
  children: React.ReactNode;
  className?: string;
} & LayoutTitleProps;

export function AuthLayout(props: AuthLayoutProps): JSX.Element {
  return (
    <SiteThemeProvider>
      <LayoutTitle title={props.title} />
      <main className={clsx('h-full', props.className)}>{props.children}</main>
    </SiteThemeProvider>
  );
}
