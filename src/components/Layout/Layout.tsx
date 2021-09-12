import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { WidgetLayout, WidgetLayoutProps } from './WidgetLayout';

export type LayoutProps = Omit<WidgetLayoutProps, 'projectId'> & {
  noHeader?: boolean;
  noFooter?: boolean;
};

export function Layout({ noHeader, noFooter, children, ...restProps }: LayoutProps): JSX.Element {
  return (
    <WidgetLayout
      {...restProps}
      header={!noHeader && <Header />}
      footer={!noFooter && <Footer tw="mt-auto" />}
      projectId={process.env.NEXT_PUBLIC_COMMENT_PROJECT}
      tw="bg-bg"
      styles={{
        container: tw`mx-4`,
      }}
    >
      {children}
    </WidgetLayout>
  );
}
