import * as React from 'react';
import 'twin.macro';

import { useReloadOnAuthentication } from '$/hooks/useReloadOnAuthentication';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { WidgetLayout, WidgetLayoutProps } from './WidgetLayout';

export type ILayoutProps = Omit<WidgetLayoutProps, 'projectId'> & {
  noHeader?: boolean;
  noFooter?: boolean;
};

export function Layout({ noHeader, noFooter, children, ...restProps }: ILayoutProps): JSX.Element {
  useReloadOnAuthentication();

  return (
    <WidgetLayout
      {...restProps}
      header={!noHeader && <Header />}
      footer={!noFooter && <Footer tw="mt-auto" />}
      projectId={process.env.NEXT_PUBLIC_COMMENT_PROJECT}
    >
      {children}
    </WidgetLayout>
  );
}
