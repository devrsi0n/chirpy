import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';
import tw from 'twin.macro';

import { TelemetryProvider, TelemetryProviderProps } from '../TelemetryProvider';

export type WidgetLayoutProps = React.PropsWithChildren<
  Pick<TelemetryProviderProps, 'projectId'> & {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
  }
>;

export function WidgetLayout(props: WidgetLayoutProps): JSX.Element {
  const { children, projectId, header, footer } = props;
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
            {children}
          </m.div>
        </AnimatePresence>
        {footer}
      </LayoutWrapper>
    </TelemetryProvider>
  );
}

function LayoutWrapper({ children, className }: WidgetLayoutProps): JSX.Element {
  return (
    <div
      css={[tw`min-h-full text-gray-600 dark:text-gray-300 transition duration-300 font-sans px-2`]}
      className={className}
    >
      {children}
    </div>
  );
}
