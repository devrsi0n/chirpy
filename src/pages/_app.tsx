import { Global } from '@emotion/react';
import { LazyMotion } from 'framer-motion';
import { Provider as AuthProvider, signIn, useSession } from 'next-auth/client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import 'tailwindcss/tailwind.css';
import { GlobalStyles } from 'twin.macro';

import { ApolloClientProvider } from '$/blocks/ApolloClientProvider';
import { CurrentUserProvider } from '$/blocks/CurrentUserProvider';
import { Heading } from '$/components/Heading';
import { Layout, WidgetLayout } from '$/components/Layout';
import { SiteThemeProvider, ThemeProvider } from '$/components/ThemeProvider';
import { ToastProvider } from '$/components/Toast';
import { HASURA_TOKEN_MAX_AGE } from '$/lib/constants';
import { appGlobalStyles } from '$/styles/global-styles';
import { CommonPageProps } from '$/types/page.type';

function App({ Component, pageProps }: AppProps): JSX.Element {
  const handleError = React.useCallback((error: Error, info: { componentStack: string }) => {
    console.log({ error, info });
  }, []);
  const AuthWrapper = (Component as any).auth ? Auth : React.Fragment;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      <AuthProvider
        session={pageProps.session}
        options={{
          clientMaxAge: HASURA_TOKEN_MAX_AGE,
        }}
      >
        {/* Tailwindcss global styles */}
        <GlobalStyles />
        <Global styles={appGlobalStyles} />

        <NextThemesProvider attribute="class" storageKey="TotalkTheme">
          <SiteThemeProvider>
            <LazyMotion features={loadFeatures} strict>
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
  const ThemeWrapper = isWidget ? ThemeProvider : React.Fragment;
  const LayoutWrapper = isWidget ? WidgetLayout : Layout;
  return (
    <ThemeWrapper {...(isWidget && { theme })}>
      <LayoutWrapper projectId={projectId!} {...layoutProps}>
        {children}
      </LayoutWrapper>
    </ThemeWrapper>
  );
}

function Auth({ children }: { children: React.ReactNode }): JSX.Element {
  const [session, loading] = useSession();
  const isUser = !!session?.user;
  React.useEffect(() => {
    if (loading) return;
    if (!isUser) signIn();
  }, [isUser, loading]);

  if (isUser) {
    return <>{children}</>;
  }

  return <div>Loading...</div>;
}

function ErrorFallback() {
  return (
    <div role="alert">
      <Heading>Sorry, something went wrong in our side. Try again later.</Heading>
    </div>
  );
}

const loadFeatures = () => import('../utilities/framer-motion-features').then((res) => res.default);
