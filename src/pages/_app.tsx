import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@/lib/apollo-client';

import '../css/tailwind.css';

interface IAppProps {
  Component: React.ComponentType;
  pageProps: object;
}

const App = ({ Component, pageProps }: IAppProps) => {
  const apollo = useApollo();
  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
