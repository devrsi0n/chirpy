import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

import { TelemetryProvider, TelemetryProviderProps } from '../../contexts/TelemetryProvider';

export type WidgetLayoutProps = React.PropsWithChildren<
  Pick<TelemetryProviderProps, 'projectId'> & {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    styles?: {
      container?: TwStyle;
    };
  }
>;

export function WidgetLayout(props: WidgetLayoutProps): JSX.Element {
  const { children, projectId, header, footer, styles } = props;
  return (
    <TelemetryProvider projectId={projectId}>
      <LayoutWrapper {...props}>
        {header}
        <AnimatePresence>
          <m.div
            css={[tw`min-h-full mr-1.5`, styles?.container]}
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
      css={[
        tw`min-h-full text-gray-600 dark:text-gray-300 transition duration-300 font-sans flex flex-col`,
      ]}
      className={className}
    >
      {children}
    </div>
  );
}
