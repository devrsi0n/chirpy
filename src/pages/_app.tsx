import { Global } from '@emotion/react';
import { LazyMotion } from 'framer-motion';
import { SessionProvider } from 'next-auth/react';
import PlausibleProvider from 'next-plausible';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import 'tailwindcss/tailwind.css';
import { GlobalStyles } from 'twin.macro';

import { ErrorFallback } from '$/blocks/error-fallback';
import { ToastProvider } from '$/components/toast';
import { CurrentUserProvider } from '$/contexts/current-user-context';
import { GQLClientProvider } from '$/contexts/gql-client-context';
import { NotificationProvider } from '$/contexts/notification-context';
import { ANALYTICS_DOMAIN, HASURA_TOKEN_MAX_AGE } from '$/lib/constants';
import { appGlobalStyles } from '$/styles/global-styles';

function App({ Component, pageProps: { session, isWidget, ...pageProps } }: AppProps): JSX.Element {
  const handleError = React.useCallback((error: Error, info: { componentStack: string }) => {
    console.log({ error, info });
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      <PlausibleProvider domain={ANALYTICS_DOMAIN}>
        <SessionProvider
          {...(session && { session })}
          // Refresh hasura token before it expires
          refetchInterval={HASURA_TOKEN_MAX_AGE - 5 * 60}
        >
          {/* Tailwindcss global styles */}
          <GlobalStyles />
          <Global styles={appGlobalStyles} />

          <NextThemesProvider attribute="class" storageKey="chirpy.theme">
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
    </ErrorBoundary>
  );
}

export default App;

const loadFeatures = () => import('../utilities/framer-motion-features').then((res) => res.default);
