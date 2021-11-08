import { Global } from '@emotion/react';
import { LazyMotion } from 'framer-motion';
import { Provider as AuthProvider, signIn, useSession } from 'next-auth/client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useMountedState } from 'react-use';
import 'tailwindcss/tailwind.css';
import { GlobalStyles } from 'twin.macro';

import { ErrorFallback } from '$/blocks/ErrorFallback';
import { Layout, WidgetLayout } from '$/components/Layout';
import { Spinner } from '$/components/Spinner';
import { ToastProvider } from '$/components/Toast';
import { ApolloClientProvider } from '$/contexts/ApolloClientProvider';
import { CurrentUserProvider } from '$/contexts/CurrentUserProvider';
import { SiteThemeProvider, WidgetThemeProvider } from '$/contexts/ThemeProvider';
import { HASURA_TOKEN_MAX_AGE } from '$/lib/constants';
import { appGlobalStyles } from '$/styles/global-styles';
import { CommonPageProps } from '$/types/page.type';

function App({ Component, pageProps }: AppProps): JSX.Element {
  const handleError = React.useCallback((error: Error, info: { componentStack: string }) => {
    console.log({ error, info });
  }, []);
  const AuthWrapper = (Component as any).auth ? AuthGuard : React.Fragment;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      <AuthProvider
        session={pageProps.session}
        options={{
          // Refresh hasura token before it expires
          clientMaxAge: HASURA_TOKEN_MAX_AGE - 5 * 60,
        }}
      >
        {/* Tailwindcss global styles */}
        <GlobalStyles />
        <Global styles={appGlobalStyles} />

        <NextThemesProvider attribute="class" storageKey="TotalkTheme">
          <SiteThemeProvider>
            <LazyMotion features={loadFeatures} strict>
              <SessionGuard>
                <ApolloClientProvider>
                  <CurrentUserProvider>
                    <ToastProvider>
                      <AppLayout {...pageProps}>
                        <AuthWrapper>
                          <Component {...pageProps} />
                        </AuthWrapper>
                      </AppLayout>
                    </ToastProvider>
                  </CurrentUserProvider>
                </ApolloClientProvider>
              </SessionGuard>
            </LazyMotion>
          </SiteThemeProvider>
        </NextThemesProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

type AppLayoutProps = CommonPageProps & {
  children: React.ReactNode;
};

function AppLayout(props: AppLayoutProps): JSX.Element {
  const { isWidget, children, projectId, layoutProps, theme } = props;
  const ThemeWrapper = isWidget ? WidgetThemeProvider : React.Fragment;
  const LayoutWrapper = isWidget ? WidgetLayout : Layout;
  return (
    <ThemeWrapper {...(isWidget && { theme })}>
      <LayoutWrapper projectId={projectId!} {...layoutProps}>
        {children}
      </LayoutWrapper>
    </ThemeWrapper>
  );
}

function SessionGuard({ children }: { children: React.ReactNode }): JSX.Element {
  const [, loading] = useSession();
  const isMounted = useMountedState();

  if (loading && !isMounted) {
    return <Spinner tw="mt-32 justify-center" />;
  }
  return <>{children}</>;
}

function AuthGuard({ children }: { children: React.ReactNode }): JSX.Element {
  const [session, loading] = useSession();
  const isUser = !!session?.user;
  React.useEffect(() => {
    if (!loading && !isUser) {
      signIn();
    }
  }, [isUser, loading]);

  return <>{children}</>;
}

const loadFeatures = () => import('../utilities/framer-motion-features').then((res) => res.default);
