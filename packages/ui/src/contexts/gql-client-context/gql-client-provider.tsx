import { useSession } from 'next-auth/react';
import * as React from 'react';
import { Provider } from 'urql';

import { createGqlClient } from '../../utils/gql-client';

export type GqlClientProviderProps = React.PropsWithChildren<{
  //
}>;

// TODO: Replace it with `next-urql` for better performance
export function GQLClientProvider({
  children,
}: GqlClientProviderProps): JSX.Element {
  const { data: session } = useSession();
  const client = React.useMemo(
    () => createGqlClient(session?.hasuraToken),
    [session?.hasuraToken],
  );

  return <Provider value={client}>{children}</Provider>;
}

export { SessionProvider, getSession, useSession } from 'next-auth/react';
