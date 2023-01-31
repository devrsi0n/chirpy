import { CommonWidgetProps, PageProps } from '@chirpy-dev/types';
import { ANALYTICS_DOMAIN, isBrowser } from '@chirpy-dev/utils';
import { LazyMotion } from 'framer-motion';
import { SessionProvider } from 'next-auth/react';
import PlausibleProvider from 'next-plausible';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import * as React from 'react';
import { Provider as WrapBalancerProvider } from 'react-wrap-balancer';

import 'react-notion-x/src/styles.css';

import Script from 'next/script';

import { ToastProvider } from '../components';
import { CurrentUserProvider, NotificationProvider } from '../contexts';
import { trpcClient } from '../utilities/trpc-client';

export const App = trpcClient.withTRPC(function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<PageProps>): JSX.Element {
  const currentOrigin = isBrowser ? window.location.origin : null;
  return (
    <>
      <PlausibleProvider domain={ANALYTICS_DOMAIN}>
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
                    <WrapBalancerProvider>
                      <Component {...pageProps} />
                    </WrapBalancerProvider>
                  </NotificationProvider>
                </ToastProvider>
              </CurrentUserProvider>
            </LazyMotion>
          </NextThemesProvider>
        </SessionProvider>
      </PlausibleProvider>
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
