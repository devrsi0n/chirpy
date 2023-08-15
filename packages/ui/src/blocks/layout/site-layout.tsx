import clsx from 'clsx';
import * as React from 'react';

import { SiteThemeProvider } from '../../contexts';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { LayoutWrapper, LayoutWrapperProps } from './layout-wrapper';
import cssstyles from './layout.module.scss';

export type LayoutProps = React.PropsWithChildren<{
  hideHeader?: boolean;
  hideFooter?: boolean;
  hideFullBleed?: boolean;
  enableBgGradient?: boolean;
  styles?: {
    container?: string;
  };
}> &
  Pick<LayoutWrapperProps, 'title'>;

export function SiteLayout({
  title,
  hideHeader,
  hideFooter,
  enableBgGradient,
  children,
  styles,
  hideFullBleed,
}: LayoutProps): JSX.Element {
  return (
    <SiteThemeProvider>
      <LayoutWrapper
        title={title}
        className={clsx(
          enableBgGradient &&
            `before:absolute before:inset-0 before:content-['']`,
          enableBgGradient && cssstyles.layoutWrapper,
        )}
      >
        {!hideHeader && <Header />}
        <main
          className={clsx(
            // Make main content to fill viewport even the content isn't tall enough
            'min-h-[calc(100vh-109px)] py-16 md:mx-4',
            // https://www.joshwcomeau.com/css/full-bleed/
            !hideFullBleed && cssstyles.layoutMain,
            styles?.container,
          )}
        >
          {/* This div is necessary to make fill viewport work */}
          <div>{children}</div>
        </main>
        {!hideFooter && <Footer className="mt-auto" />}
      </LayoutWrapper>
    </SiteThemeProvider>
  );
}
