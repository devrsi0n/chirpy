import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';
import tw from 'twin.macro';

import { useReloadOnAuthentication } from '$/hooks/useReloadOnAuthentication';

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
  useReloadOnAuthentication();

  return (
    <div {...divProps} css={[tw`min-h-full`, noContainer && tw`flex flex-col items-center`]}>
      {!noHeader && <Header />}

      <AnimatePresence>
        <m.div
          tw="min-h-full"
          transition={{ duration: 0.35 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {noContainer ? (
            children
          ) : (
            <main tw="py-10 min-h-full" className="main-container">
              {children}
            </main>
          )}
        </m.div>
      </AnimatePresence>

      {!noFooter && <Footer tw="mt-auto" />}
    </div>
  );
}
