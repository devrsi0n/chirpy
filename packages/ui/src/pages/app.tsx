import { CommonWidgetProps, PageProps } from '@chirpy-dev/types';
import { ANALYTICS_DOMAIN, HASURA_TOKEN_MAX_AGE } from '@chirpy-dev/utils';
import { LazyMotion } from 'framer-motion';
import { SessionProvider } from 'next-auth/react';
import PlausibleProvider from 'next-plausible';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import * as React from 'react';

import { ToastProvider } from '../components';
import { CurrentUserProvider, NotificationProvider } from '../contexts';
import { trpcClient } from '../utilities/trpc-client';

export const App = trpcClient.withTRPC(function App({
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
            <CurrentUserProvider>
              <ToastProvider>
                <NotificationProvider>
                  <Component {...pageProps} />
                </NotificationProvider>
              </ToastProvider>
            </CurrentUserProvider>
          </LazyMotion>
        </NextThemesProvider>
      </SessionProvider>
    </PlausibleProvider>
  );
});

export { reportWebVitals } from 'next-axiom/dist/webVitals';

export const loadFeatures = () =>
  import(
    /* webpackChunkName: "framer-motion-features"*/ '../utilities/framer-motion-features'
  ).then((res) => res.default);
