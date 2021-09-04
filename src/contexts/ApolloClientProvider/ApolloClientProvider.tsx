import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { useSession } from 'next-auth/client';
import * as React from 'react';

import { getApolloClient } from './utilities';

export type ApolloClientProviderProps = React.PropsWithChildren<{
  //
}>;

export function ApolloClientProvider({ children }: ApolloClientProviderProps): JSX.Element {
  const [session, loading] = useSession();
  const [client, setClient] = React.useState<ApolloClient<NormalizedCacheObject>>(() =>
    getApolloClient(session?.hasuraToken),
  );
  React.useEffect(() => {
    if (loading || !session?.hasuraToken) {
      return;
    }
    setClient(getApolloClient(session.hasuraToken));
  }, [session?.hasuraToken, loading]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
