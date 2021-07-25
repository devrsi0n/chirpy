import { QueryHookOptions } from '@apollo/client';
import { useSession } from 'next-auth/client';
import * as React from 'react';

import {
  CurrentUserQuery,
  CurrentUserQueryVariables,
  useCurrentUserLazyQuery,
} from '$/graphql/generated/user';

import { CurrentUserContext, CurrentUserContextType } from './CurrentUserContext';

export type CurrentUserProviderProps = React.PropsWithChildren<{
  apolloBaseOptions?: QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>;
}>;

export function CurrentUserProvider({
  apolloBaseOptions,
  children,
}: CurrentUserProviderProps): JSX.Element {
  const [session, sessionIsLoading] = useSession();
  const [getUser, { data, ...restProps }] = useCurrentUserLazyQuery({
    ...apolloBaseOptions,
    notifyOnNetworkStatusChange: true,
  });

  const handleFetchUser = React.useCallback(() => {
    return getUser({ variables: { id: session?.user?.id || -1 } });
  }, [getUser, session?.user?.id]);

  React.useEffect(() => {
    handleFetchUser();
  }, [handleFetchUser]);

  const value = React.useMemo<CurrentUserContextType>(
    () => ({
      ...restProps,
      loading: sessionIsLoading || restProps.loading,
      data: data?.userByPk || {},
      refetchData: handleFetchUser,
      isLogin: !!data?.userByPk?.id,
    }),
    [data, restProps, handleFetchUser, sessionIsLoading],
  );

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
}
