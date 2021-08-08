import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';
import tw from 'twin.macro';

import { TelemetryProvider, TelemetryProviderProps } from '../TelemetryProvider';

export type WidgetLayoutProps = React.PropsWithChildren<
  Pick<TelemetryProviderProps, 'projectId'> & {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    noWrapper?: boolean;
    noContainer?: boolean;
  }
>;

export function WidgetLayout(props: WidgetLayoutProps): JSX.Element {
  const { noContainer, children, projectId, header, footer } = props;
  return (
    <TelemetryProvider projectId={projectId}>
      <LayoutWrapper {...props}>
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
      </LayoutWrapper>
    </TelemetryProvider>
  );
}

function LayoutWrapper({ noContainer, noWrapper, children }: WidgetLayoutProps): JSX.Element {
  if (noWrapper) {
    return <>{children}</>;
  }
  return (
    <div
      css={[
        tw`min-h-full text-gray-600 dark:text-gray-300 transition duration-300 font-sans`,
        noContainer && tw`flex flex-col items-center`,
      ]}
      style={{
        background: 'hsl(210, 10%, 98%)',
      }}
    >
      {children}
    </div>
  );
}
