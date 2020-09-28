import '../styles/global.css';
import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'theme-ui';
import { useApollo } from '$/lib/apollo-client';
import theme from '$/styles/theme';
import { Layout } from '$/components/Layout';

interface IAppProps {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
}

function App({ Component, pageProps }: IAppProps): JSX.Element {
  const apollo = useApollo();
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apollo}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
