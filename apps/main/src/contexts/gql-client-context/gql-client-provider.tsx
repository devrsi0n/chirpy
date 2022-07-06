import { useSession } from 'next-auth/react';
import * as React from 'react';
import { Provider } from 'urql';

import { createGqlClient } from '$/lib/gql-client';

export type GqlClientProviderProps = React.PropsWithChildren<{
  //
}>;

// TODO: Replace it with `next-urql` for better performance
export function GQLClientProvider({
  children,
}: GqlClientProviderProps): JSX.Element {
  const { data: session } = useSession();
  const [client, setClient] = React.useState(() =>
    createGqlClient(session?.hasuraToken),
  );
  React.useEffect(() => {
    if (!session?.hasuraToken) {
      return;
    }
    setClient(createGqlClient(session.hasuraToken));
  }, [session?.hasuraToken]);

  return <Provider value={client}>{children}</Provider>;
}
