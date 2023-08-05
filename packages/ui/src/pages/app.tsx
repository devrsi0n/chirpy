import { trpc } from '@chirpy-dev/trpc/src/client';
import { CommonWidgetProps, PageProps } from '@chirpy-dev/types';
import { isBrowser } from '@chirpy-dev/utils';
import clsx from 'clsx';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Script from 'next/script';
import * as React from 'react';

import { ToastProvider } from '../components';
import { CurrentUserProvider, NotificationProvider } from '../contexts';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const App = trpc.withTRPC(function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<PageProps>): JSX.Element {
  React.useEffect(() => {
    // Only way to add a font to the body (to fix font for dialogs)
    // since Next.js doesn't allow it in custom _document
    document.body.classList.add(inter.variable);
  }, []);

  const currentOrigin = isBrowser ? window.location.origin : null;
  return (
    <div className={clsx(inter.variable, 'h-full')}>
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
          <CurrentUserProvider>
            <ToastProvider>
              <NotificationProvider>
                <Component {...pageProps} />
              </NotificationProvider>
            </ToastProvider>
          </CurrentUserProvider>
        </NextThemesProvider>
      </SessionProvider>
      {currentOrigin && (
        <Script
          id="chirpy-ats"
          strategy="afterInteractive"
          src="https://unpkg.com/@tinybirdco/flock.js"
          data-proxy={currentOrigin}
        />
      )}
    </div>
  );
});

export { reportWebVitals } from 'next-axiom/dist/webVitals';
