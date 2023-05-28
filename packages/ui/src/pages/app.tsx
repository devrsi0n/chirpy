import { CommonWidgetProps, PageProps } from '@chirpy-dev/types';
import { LazyMotion } from 'framer-motion';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import * as React from 'react';

import { ToastProvider } from '../components';
import { CurrentUserProvider, NotificationProvider } from '../contexts';
import { trpcClient } from '../utilities/trpc-client';

export const App = trpcClient.withTRPC(function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<PageProps>): JSX.Element {
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
      <Script
        src="https://unpkg.com/@tinybirdco/flock.js"
        data-host="https://api.tinybird.co"
        data-token="p.eyJ1IjogIjI1YzY5MzRiLWU5NjctNDk1My05ZDNmLTIxOTk1MTA2MGJlNSIsICJpZCI6ICI2OTg1ZjQ5NS0yNWM3LTRiYmYtOWIyMy05M2FiZmNlNDhiZjcifQ.N2KCqkFyxKf6N_WoyRNoBgPQcIIbIrpsqz78DvW1c2g"
      />
    </>
  );
});

export { reportWebVitals } from 'next-axiom/dist/webVitals';

export const loadFeatures = () =>
  import(
    /* webpackChunkName: "framer-motion-features"*/ '../utilities/framer-motion-features'
  ).then((res) => res.default);
