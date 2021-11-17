import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

import { TelemetryProvider, TelemetryProviderProps } from '../../contexts/TelemetryProvider';
import { LayoutWrapper } from './SharedComponents';

export type WidgetLayoutProps = React.PropsWithChildren<
  Pick<TelemetryProviderProps, 'projectId'> & {
    className?: string;
  }
>;

export function WidgetLayout(props: WidgetLayoutProps): JSX.Element {
  const { children, projectId } = props;
  return (
    <TelemetryProvider projectId={projectId}>
      <LayoutWrapper tw="bg-bg min-h-full py-10 mt-1 sm:mr-1.5">
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
    </TelemetryProvider>
  );
}
