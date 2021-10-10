import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';
import { css, TwStyle } from 'twin.macro';

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
      <LayoutWrapper tw="bg-bg">
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
