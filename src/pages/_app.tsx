import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '$/lib/apollo-client';

import '../css/tailwind.css';

interface IAppProps {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
}

const App = ({ Component, pageProps }: IAppProps): JSX.Element => {
  const apollo = useApollo();
  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
