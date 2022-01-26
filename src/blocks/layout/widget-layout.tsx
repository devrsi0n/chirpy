import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';
import 'twin.macro';

import { WidgetThemeProvider, WidgetThemeProviderProps } from '$/contexts/theme-context';

import { LayoutWrapper } from './layout-wrapper';

export type WidgetLayoutProps = {
  className?: string;
} & WidgetThemeProviderProps;

/**
 * `WidgetLayout` provides theme and container styles.
 * Do not use it in _app.tsx and render it with `SiteLayout`
 * conditionally, it will increase bundle size on widgets
 */
export function WidgetLayout(props: WidgetLayoutProps): JSX.Element {
  const { children, widgetTheme } = props;
  return (
    <WidgetThemeProvider widgetTheme={widgetTheme}>
      <LayoutWrapper tw="min-h-full py-10 sm:mr-1">
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
    </WidgetThemeProvider>
  );
}
