import '@chirpy-dev/ui/src/styles/globals.scss';

import { loadFlock } from '@chirpy-dev/flock';
import { trpc } from '@chirpy-dev/trpc/src/client';
import { ToastProvider } from '@chirpy-dev/ui';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import * as React from 'react';

import { setupWidgetSessionHeader } from '../components/widget-header';
import { CurrentUserProvider } from '../contexts/current-user-context';
import { NotificationProvider } from '../contexts/notification-context';
import { CommonWidgetProps, PageProps } from '../types/page';

setupWidgetSessionHeader();

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const App = trpc.withTRPC(function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<PageProps>): JSX.Element {
  React.useEffect(() => {
    // Only way to add a font to the body (to fix font for dialogs)
    // since Next.js doesn't allow it in custom _document
    document.body.classList.add(inter.variable);
    loadFlock();
  }, []);

  return (
    <div className={inter.variable}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SessionProvider {...(session && { session })} refetchWhenOffline={false}>
        <NextThemesProvider
          attribute="class"
          // Widget and app themes are different
          storageKey={
            (pageProps as CommonWidgetProps).isWidget
              ? 'chirpy.widget.theme'
              : 'chirpy.theme'
          }
        >
          <CurrentUserProvider
            isWidget={!!(pageProps as CommonWidgetProps).isWidget}
          >
            <ToastProvider>
              <NotificationProvider>
                <Component {...pageProps} />
              </NotificationProvider>
            </ToastProvider>
          </CurrentUserProvider>
        </NextThemesProvider>
      </SessionProvider>
    </div>
  );
});

export default App;

export { reportWebVitals } from 'next-axiom/dist/webVitals';
