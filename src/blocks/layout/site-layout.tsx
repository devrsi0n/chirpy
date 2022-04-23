import clsx from 'clsx';
import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';

import { SiteThemeProvider } from '$/contexts/theme-context';

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

export default function SiteLayout({
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
          enableBgGradient && `before:absolute before:inset-0 before:content-['']`,
          enableBgGradient && cssstyles.layoutWrapper,
        )}
      >
        {!hideHeader && <Header />}
        <AnimatePresence>
          <m.main
            className={clsx(
              'min-h-full py-16 md:mx-4',
              // https://www.joshwcomeau.com/css/full-bleed/
              !hideFullBleed && cssstyles.layoutMain,
              styles?.container,
            )}
            transition={{ duration: 0.35 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </m.main>
        </AnimatePresence>
        {!hideFooter && <Footer className="mt-auto" />}
      </LayoutWrapper>
    </SiteThemeProvider>
  );
}
