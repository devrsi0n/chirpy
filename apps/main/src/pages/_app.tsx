import { LazyMotion } from 'framer-motion';
import { SessionProvider } from 'next-auth/react';
import PlausibleProvider from 'next-plausible';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import * as React from 'react';

import { ToastProvider } from '$/components/toast';
import { CurrentUserProvider } from '$/contexts/current-user-context';
import { GQLClientProvider } from '$/contexts/gql-client-context';
import { NotificationProvider } from '$/contexts/notification-context';
import { ANALYTICS_DOMAIN, HASURA_TOKEN_MAX_AGE } from '$/lib/constants';

import '$/styles/global-styles.scss';

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
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
            pageProps.isWidget ? 'chirpy.widget.theme' : 'chirpy.theme'
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

export default App;

export { reportWebVitals } from 'next-axiom';

export const loadFeatures = () =>
  import(
    /* webpackChunkName: "framer-motion-features"*/ '../utilities/framer-motion-features'
  ).then((res) => res.default);
