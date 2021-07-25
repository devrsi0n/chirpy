import { ApolloProvider } from '@apollo/client';
import * as React from 'react';

import { useApollo } from './useApollo';

export type ApolloClientProviderProps = React.PropsWithChildren<{
  //
}>;

export function ApolloClientProvider({ children }: ApolloClientProviderProps): JSX.Element {
  const apollo = useApollo();

  return <ApolloProvider client={apollo}>{children}</ApolloProvider>;
}
