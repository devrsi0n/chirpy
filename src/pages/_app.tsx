import { ApolloProvider } from '@apollo/client';
import { Global } from '@emotion/react';
import { LazyMotion } from 'framer-motion';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import * as React from 'react';
// import 'tailwindcss/tailwind.css';
import tw, { css, GlobalStyles, theme } from 'twin.macro';

import { CurrentUserProvider } from '$/blocks/CurrentUserProvider';
import { SiteThemeProvider } from '$/components/ThemeProvider';
import { ToastProvider } from '$/components/Toast';
import { useApollo } from '$/lib/apollo-client';

function App({ Component, pageProps }: AppProps): JSX.Element {
  const apollo = useApollo();
  return (
    <>
      {/* Tailwindcss global styles */}
      <GlobalStyles />
      <Global styles={appGlobalStyles} />

      <NextThemesProvider attribute="class" storageKey="TotalkTheme">
        <SiteThemeProvider>
          <LazyMotion features={loadFeatures} strict>
            <ApolloProvider client={apollo}>
              <CurrentUserProvider>
                <ToastProvider>
                  <Component {...pageProps} />
                </ToastProvider>
              </CurrentUserProvider>
            </ApolloProvider>
          </LazyMotion>
        </SiteThemeProvider>
      </NextThemesProvider>
    </>
  );
}

export default App;

const loadFeatures = () => import('../utilities/framer-motion-features').then((res) => res.default);

const appGlobalStyles = css`
  ::selection {
    ${tw`bg-green-200`}
  }

  input:focus {
    outline: none;
  }

  html,
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    text-rendering: optimizeLegibility;
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
  }

  button:focus {
    outline: 0;
  }

  html,
  body,
  #__next {
    height: 100%;
  }

  @font-face {
    font-family: 'Inter var';
    font-style: normal;
    font-weight: 100 900;
    font-display: optional;
    src: url('/fonts/Inter/Inter-roman.var.woff2') format('woff2');
    font-named-instance: 'Regular';
  }

  @font-face {
    font-family: 'Inter var';
    font-style: italic;
    font-weight: 100 900;
    font-display: optional;
    src: url('/fonts/Inter/Inter-italic.var.woff2') format('woff2');
    font-named-instance: 'Italic';
  }

  // https://www.joshwcomeau.com/css/full-bleed/
  .main-container {
    display: grid;
    grid-template-columns: 1fr min(70ch, calc(100% - 64px)) 1fr;
    grid-column-gap: 32px;

    & > * {
      grid-column: 2;
    }

    .full-bleed {
      grid-column: 1 / -1;
    }
  }

  // Header and footer
  .layout {
    width: clamp(540px, 70ch, 1080px);
  }
  @media screen and (max-width: 540px) {
    .layout {
      width: 100%;
      padding-left: ${theme('padding.4')};
      padding-right: ${theme('spacing.4')};
    }
  }

  .article > * {
    margin-bottom: ${theme('padding.10')};
  }

  // Fix twin.macro not working
  .transform {
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y))
      rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
      scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
`;
