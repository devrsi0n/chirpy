import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { useSession } from 'next-auth/react';
import * as React from 'react';

import { iniApolloClient } from './utilities';

export type ApolloClientProviderProps = React.PropsWithChildren<{
  //
}>;

export function ApolloClientProvider({ children }: ApolloClientProviderProps): JSX.Element {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [client, setClient] = React.useState<ApolloClient<NormalizedCacheObject>>(() =>
    iniApolloClient(session?.hasuraToken),
  );
  React.useEffect(() => {
    if (loading || !session?.hasuraToken) {
      return;
    }
    setClient(iniApolloClient(session.hasuraToken));
  }, [session?.hasuraToken, loading]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
