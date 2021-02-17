import '../styles/tailwind.css';
import '../styles/utilities.css';
import '../styles/common.scss';
import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { useApollo } from '$/lib/apollo-client';
import { CurrentUserProvider } from '$/components/CurrentUserProvider';

dayjs.extend(relativeTime);

interface IAppProps {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
}

function App({ Component, pageProps }: IAppProps): JSX.Element {
  const apollo = useApollo();
  return (
    <NextThemesProvider attribute="class" storageKey="TotalkTheme">
      <ApolloProvider client={apollo}>
        <CurrentUserProvider>
          <Component {...pageProps} />
        </CurrentUserProvider>
      </ApolloProvider>
    </NextThemesProvider>
  );
}

export default App;
