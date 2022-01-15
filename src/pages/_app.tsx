import { Global } from '@emotion/react';
import { LazyMotion } from 'framer-motion';
import { SessionProvider, useSession } from 'next-auth/react';
import PlausibleProvider from 'next-plausible';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import 'tailwindcss/tailwind.css';
import { GlobalStyles } from 'twin.macro';

import { ErrorFallback } from '$/blocks/ErrorFallback';
import { LazySiteLayout } from '$/blocks/Layout/LazySiteLayout';
import { Spinner } from '$/components/Spinner';
import { ToastProvider } from '$/components/Toast';
import { CurrentUserProvider } from '$/contexts/CurrentUserProvider';
import { GQLClientProvider } from '$/contexts/GQLClientProvider';
import { ANALYTICS_DOMAIN, APP_NAME_LOWERCASE, HASURA_TOKEN_MAX_AGE } from '$/lib/constants';
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

          <NextThemesProvider attribute="class" storageKey={`${APP_NAME_LOWERCASE}.theme`}>
            <LazyMotion features={loadFeatures} strict>
              <GQLClientProvider>
                <CurrentUserProvider>
                  <ToastProvider>
                    {(Component as any).auth ? (
                      <AuthGuard isWidget={isWidget}>
                        <Component {...pageProps} />
                      </AuthGuard>
                    ) : (
                      <Component {...pageProps} />
                    )}
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

type AuthGuardProps = {
  isWidget: true | undefined;
  children: React.ReactNode;
};

function AuthGuard({ children, isWidget }: AuthGuardProps): JSX.Element {
  // Redirect user to sign-in page if no session available
  const { data: session } = useSession({ required: true });
  const hasUser = !!session?.user;

  if (hasUser) {
    return <>{children}</>;
  }
  // Only wrap spinner with Layout on non-widget scenarios
  const Wrapper = isWidget ? React.Fragment : LazySiteLayout;
  return (
    <Wrapper>
      <Spinner tw="mt-32 justify-center" />
    </Wrapper>
  );
}

const loadFeatures = () => import('../utilities/framer-motion-features').then((res) => res.default);
