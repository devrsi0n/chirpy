import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';
import tw from 'twin.macro';

import { TelemetryProvider, TelemetryProviderProps } from '../TelemetryProvider';

export type WidgetLayoutProps = React.ComponentPropsWithoutRef<'div'> &
  Pick<TelemetryProviderProps, 'projectId'> & {
    noContainer?: boolean;
    header?: React.ReactNode;
    footer?: React.ReactNode;
  };

export function WidgetLayout({
  noContainer,
  children,
  projectId,
  header,
  footer,
  ...divProps
}: WidgetLayoutProps): JSX.Element {
  return (
    <TelemetryProvider projectId={projectId}>
      <div
        {...divProps}
        css={[tw`min-h-full`, noContainer && tw`flex flex-col items-center`]}
        style={{
          background: 'hsl(210, 10%, 98%)',
        }}
      >
        {header}
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
        {footer}
      </div>
    </TelemetryProvider>
  );
}
