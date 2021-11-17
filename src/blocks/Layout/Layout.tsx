import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';
import { css, theme, TwStyle } from 'twin.macro';

import { TelemetryProvider } from '$/contexts/TelemetryProvider';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { LayoutWrapper } from './SharedComponents';

export type LayoutProps = React.PropsWithChildren<{
  noHeader?: boolean;
  noFooter?: boolean;
  styles?: {
    container?: TwStyle;
  };
}>;

export function Layout({ noHeader, noFooter, children, styles }: LayoutProps): JSX.Element {
  return (
    <TelemetryProvider projectId={process.env.NEXT_PUBLIC_COMMENT_PROJECT}>
      <GradientBackground />
      <LayoutWrapper>
        {!noHeader && <Header />}
        <AnimatePresence>
          <m.main
            tw="min-h-full py-16 md:(mx-4)"
            css={[
              // https://www.joshwcomeau.com/css/full-bleed/
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
        {!noFooter && <Footer tw="mt-auto" />}
      </LayoutWrapper>
    </TelemetryProvider>
  );
}

function GradientBackground(): JSX.Element {
  return (
    <div
      tw="absolute inset-0 z-[-1] bg-bg"
      css={{
        background: `radial-gradient(circle at center left, ${theme(
          'colors.primary.400',
        )}, rgba(255, 255, 255, 0) 15%), radial-gradient(circle at 80% 20%, ${theme(
          'colors.blue.400',
        )}, rgba(255, 255, 255, 0) 15%)`,
      }}
    />
  );
}
