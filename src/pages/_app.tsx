import '../styles/global.css';
import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '$/components/ThemeProvider';
import { useApollo } from '$/lib/apollo-client';
import { Layout } from '$/components/Layout';
import { colorModes } from '$/styles/colors';

interface IAppProps {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
}

function App({ Component, pageProps }: IAppProps): JSX.Element {
  const apollo = useApollo();
  return (
    <ThemeProvider colorModes={colorModes}>
      <ApolloProvider client={apollo}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
