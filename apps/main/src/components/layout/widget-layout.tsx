import { MaintenanceBanner, useWidgetSideEffects } from '@chirpy-dev/ui';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';

import { WidgetThemeProvider, WidgetThemeProviderProps } from '$/contexts';
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
      <LayoutWrapper title={title} className="pb-60 pt-14 sm:mr-1">
        <MaintenanceBanner />
        <AnimatePresence>
          <motion.div
            className="mt-2"
            transition={{ duration: 0.35 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </LayoutWrapper>
    </WidgetThemeProvider>
  );
}
