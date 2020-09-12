import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'theme-ui';
import { useApollo } from '$/lib/apollo-client';
import theme from '$/theme';

interface IAppProps {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
}

const App = ({ Component, pageProps }: IAppProps): JSX.Element => {
  const apollo = useApollo();
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
