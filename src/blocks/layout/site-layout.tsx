import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';
import tw, { css, theme, TwStyle } from 'twin.macro';

import { SiteThemeProvider } from '$/contexts/theme-context';

import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { LayoutWrapper } from './layout-wrapper';

export type LayoutProps = React.PropsWithChildren<{
  hideHeader?: boolean;
  hideFooter?: boolean;
  hideFullBleed?: boolean;
  enableBgGradient?: boolean;
  styles?: {
    container?: TwStyle;
  };
}>;

export default function SiteLayout({
  hideHeader,
  hideFooter,
  enableBgGradient,
  children,
  styles,
  hideFullBleed,
}: LayoutProps): JSX.Element {
  const gradientColor = 'rgba(255, 255, 255, 0)';
  const ellipse = '25%';
  return (
    <SiteThemeProvider>
      <LayoutWrapper
        css={[
          enableBgGradient && tw`before:(absolute inset-0 content-[''])`,
          {
            ...(enableBgGradient && {
              '::before': {
                background: `radial-gradient(circle at 5% 50%, ${theme(
                  'colors.primary.400',
                )}, ${gradientColor} ${ellipse}), radial-gradient(circle at 90% 15%, ${theme(
                  'colors.plum.400',
                )}, ${gradientColor} ${ellipse})`,
              },
            }),
          },
        ]}
      >
        {!hideHeader && <Header />}
        <AnimatePresence>
          <m.main
            tw="min-h-full py-16 md:(mx-4)"
            css={[
              // https://www.joshwcomeau.com/css/full-bleed/
              !hideFullBleed &&
                css`
                  display: grid;
                  grid-template-columns: 1fr min(75ch, calc(100% - 32px)) 1fr;
                  grid-column-gap: 16px;

                  & > * {
                    grid-column: 2;
                  }

                  & .full-bleed {
                    grid-column: 1 / -1;
                  }
                `,
              styles?.container,
            ]}
            transition={{ duration: 0.35 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </m.main>
        </AnimatePresence>
        {!hideFooter && <Footer tw="mt-auto" />}
      </LayoutWrapper>
    </SiteThemeProvider>
  );
}
