import { trpcClient } from '@chirpy-dev/trpc/src/client';
import { CommonWidgetProps, PageProps } from '@chirpy-dev/types';
import { isBrowser } from '@chirpy-dev/utils';
import { LazyMotion } from 'framer-motion';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import * as React from 'react';

import { ToastProvider } from '../components';
import { CurrentUserProvider, NotificationProvider } from '../contexts';

export const App = trpcClient.withTRPC(function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<PageProps>): JSX.Element {
  const currentOrigin = isBrowser ? window.location.origin : null;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SessionProvider {...(session && { session })}>
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
      {currentOrigin && (
        <Script
          strategy="lazyOnload"
          src="https://unpkg.com/@tinybirdco/flock.js"
          data-proxy={currentOrigin}
        />
      )}
    </>
  );
});

export { reportWebVitals } from 'next-axiom/dist/webVitals';

export const loadFeatures = () =>
  import(
    /* webpackChunkName: "framer-motion-features"*/ '../utilities/framer-motion-features'
  ).then((res) => res.default);
