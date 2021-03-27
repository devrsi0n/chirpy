import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';
import tw from 'twin.macro';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

export interface ILayoutProps extends React.ComponentPropsWithoutRef<'div'> {
  noContainer?: boolean;
  noHeader?: boolean;
  noFooter?: boolean;
}

export function Layout({
  noContainer,
  noHeader,
  noFooter,
  children,
  ...divProps
}: ILayoutProps): JSX.Element {
  return (
    <div {...divProps} css={noContainer && tw`flex flex-col items-center`}>
      {!noHeader && <Header />}

      <AnimatePresence>
        <m.div
          transition={{ duration: 0.35 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {noContainer ? (
            children
          ) : (
            <main tw="py-10" className="main-container">
              {children}
            </main>
          )}
        </m.div>
      </AnimatePresence>

      {!noFooter && <Footer />}
    </div>
  );
}
