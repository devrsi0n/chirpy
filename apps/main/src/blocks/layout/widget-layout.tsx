import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';

import {
  WidgetThemeProvider,
  WidgetThemeProviderProps,
} from '$/contexts/theme-context';
import { useWidgetSideEffects } from '$/hooks/use-widget-side-effects';

import { LayoutWrapper, LayoutWrapperProps } from './layout-wrapper';

export type WidgetLayoutProps = {
  className?: string;
} & WidgetThemeProviderProps &
  Pick<LayoutWrapperProps, 'title'>;

/**
 * `WidgetLayout` provides theme and container styles.
 * Do not use it in _app.tsx and render it with `SiteLayout`
 * conditionally, it will increase bundle size on widgets
 */
export function WidgetLayout({
  title,
  children,
  widgetTheme,
}: WidgetLayoutProps): JSX.Element {
  useWidgetSideEffects();
  return (
    <WidgetThemeProvider widgetTheme={widgetTheme}>
      <LayoutWrapper title={title} className="min-h-full pt-14 pb-10 sm:mr-1">
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
