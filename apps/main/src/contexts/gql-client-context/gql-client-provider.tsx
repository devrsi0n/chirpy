import { useSession } from 'next-auth/react';
import * as React from 'react';
import { Provider } from 'urql';

import { createGqlClient, SSRData } from '$/lib/gql-client';

export type GqlClientProviderProps = React.PropsWithChildren<{
  urqlState?: SSRData;
}>;

export function GQLClientProvider({ children, urqlState }: GqlClientProviderProps): JSX.Element {
  const { data: session } = useSession();
  const [client, setClient] = React.useState(() =>
    createGqlClient(session?.hasuraToken, urqlState),
  );
  React.useEffect(() => {
    if (!session?.hasuraToken) {
      return;
    }
    setClient(createGqlClient(session.hasuraToken, urqlState));
  }, [session?.hasuraToken, urqlState]);

  return <Provider value={client}>{children}</Provider>;
}
