import '../styles/tailwind.css';
import '../styles/utilities.css';
import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '$/components/ThemeProvider';
import { useApollo } from '$/lib/apollo-client';
import { Layout } from '$/components/Layout';
import { colorModes } from '$/styles/colors';
import { CurrentUserProvider } from '$/components/CurrentUserProvider';

interface IAppProps {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
}

function App({ Component, pageProps }: IAppProps): JSX.Element {
  const apollo = useApollo();
  return (
    <ThemeProvider colorModes={colorModes}>
      <ApolloProvider client={apollo}>
        <CurrentUserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CurrentUserProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
