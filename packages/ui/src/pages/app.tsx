import { LazyMotion } from 'framer-motion';
import PlausibleProvider from 'next-plausible';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import * as React from 'react';

import { ToastProvider } from '../components';
import {
  CurrentUserProvider,
  GQLClientProvider,
  NotificationProvider,
  // This is the same SessionProvider as next-auth/react,
  // fix ref issue
  SessionProvider,
} from '../contexts';
import { ANALYTICS_DOMAIN, HASURA_TOKEN_MAX_AGE } from '@chirpy-dev/utils';
import { CommonWidgetProps, PageProps } from 'types';

export function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<PageProps>): JSX.Element {
  return (
    <PlausibleProvider domain={ANALYTICS_DOMAIN}>
      <SessionProvider
        {...(session && { session })}
        // Refresh hasura token before it expires
        refetchInterval={HASURA_TOKEN_MAX_AGE - 5 * 60}
      >
        <NextThemesProvider
          attribute="class"
          // Widget and app themes are different
          storageKey={
            (pageProps as CommonWidgetProps).isWidget
              ? 'chirpy.widget.theme'
              : 'chirpy.theme'
          }
        >
          <LazyMotion features={loadFeatures} strict>
            <GQLClientProvider>
              <CurrentUserProvider>
                <ToastProvider>
                  <NotificationProvider>
                    <Component {...pageProps} />
                  </NotificationProvider>
                </ToastProvider>
              </CurrentUserProvider>
            </GQLClientProvider>
          </LazyMotion>
        </NextThemesProvider>
      </SessionProvider>
    </PlausibleProvider>
  );
}

export { reportWebVitals } from 'next-axiom/dist/webVitals';

export const loadFeatures = () =>
  import(
    /* webpackChunkName: "framer-motion-features"*/ '../utilities/framer-motion-features'
  ).then((res) => res.default);
