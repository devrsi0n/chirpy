import { ApolloProvider } from '@apollo/client';
import { Global } from '@emotion/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import * as React from 'react';
import 'tailwindcss/tailwind.css';
import tw, { css, GlobalStyles, theme } from 'twin.macro';

import { CurrentUserProvider } from '$/components/CurrentUserProvider';
import { useApollo } from '$/lib/apollo-client';

dayjs.extend(relativeTime);

function App({ Component, pageProps }: AppProps): JSX.Element {
  const apollo = useApollo();
  return (
    <>
      {/* Tailwindcss global styles */}
      <Global styles={globalStyles} />
      <GlobalStyles />
      <NextThemesProvider attribute="class" storageKey="TotalkTheme">
        <ApolloProvider client={apollo}>
          <CurrentUserProvider>
            <Component {...pageProps} />
          </CurrentUserProvider>
        </ApolloProvider>
      </NextThemesProvider>
    </>
  );
}

export default App;

const globalStyles = css`
  ::selection {
    color: #fff;
    ${tw`bg-purple-400`}
  }

  input:focus {
    outline: none;
  }

  * {
    text-rendering: optimizeLegibility;
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
  }

  button:focus {
    outline: 0;
  }

  // https://www.joshwcomeau.com/css/full-bleed/
  .main-container {
    display: grid;
    grid-template-columns: 1fr min(60ch, calc(100% - 64px)) 1fr;
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
`;
