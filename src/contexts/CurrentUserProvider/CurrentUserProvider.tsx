import { QueryHookOptions } from '@apollo/client';
import { useSession } from 'next-auth/react';
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
  const { data: session, status } = useSession();
  const sessionIsLoading = status === 'loading';
  const [fetchUser, { data, ...restProps }] = useCurrentUserLazyQuery({
    ...apolloBaseOptions,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const handleFetchUser = React.useCallback(() => {
    if (typeof session?.user?.id !== 'string') {
      return;
    }
    return fetchUser({ variables: { id: session.user.id } });
  }, [fetchUser, session?.user?.id]);

  React.useEffect(() => {
    handleFetchUser();
  }, [handleFetchUser]);

  const value = React.useMemo<CurrentUserContextType>(() => {
    return {
      ...restProps,
      loading: sessionIsLoading || restProps.loading,
      data: {
        ...session?.user,
        ...data?.userByPk,
        editableProjectIds: session?.user.editableProjectIds || [],
      },
      refetchData: handleFetchUser,
      isSignIn: !!data?.userByPk?.id,
    };
  }, [data?.userByPk, restProps, handleFetchUser, session, sessionIsLoading]);

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
}
