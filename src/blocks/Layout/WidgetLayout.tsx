import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';

import { LayoutWrapper } from './SharedComponents';

export type WidgetLayoutProps = React.PropsWithChildren<{
  className?: string;
  projectId: string;
}>;

export function WidgetLayout(props: WidgetLayoutProps): JSX.Element {
  const { children } = props;
  return (
    <>
      <LayoutWrapper tw="min-h-full py-10 mt-1 sm:mr-1.5">
        <AnimatePresence>
          <m.div
            transition={{ duration: 0.35 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </m.div>
        </AnimatePresence>
      </LayoutWrapper>
    </>
  );
}
