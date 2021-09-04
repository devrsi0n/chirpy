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
  const [fetchUser, { data, ...restProps }] = useCurrentUserLazyQuery({
    ...apolloBaseOptions,
    notifyOnNetworkStatusChange: true,
  });

  const handleFetchUser = React.useCallback(() => {
    if (typeof session?.user?.id !== 'number') return;
    return fetchUser({ variables: { id: session.user.id || -1 } });
  }, [fetchUser, session?.user?.id]);

  React.useEffect(() => {
    handleFetchUser();
  }, [handleFetchUser]);

  const value = React.useMemo<CurrentUserContextType>(
    () => ({
      ...restProps,
      loading: sessionIsLoading || restProps.loading,
      data: {
        ...data?.userByPk,
        editableProjectIds: session?.user.editableProjectIds || [],
      },
      refetchData: handleFetchUser,
      isLogin: !!data?.userByPk?.id,
    }),
    [data, restProps, handleFetchUser, session, sessionIsLoading],
  );

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
}
