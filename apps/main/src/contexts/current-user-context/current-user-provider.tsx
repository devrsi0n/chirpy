import { useSession } from 'next-auth/react';
import * as React from 'react';

import { useCurrentUserQuery } from '$/graphql/generated/user';

import {
  CurrentUserContext,
  CurrentUserContextType,
} from './current-user-context';

export type CurrentUserProviderProps = React.PropsWithChildren<{
  gqlOptions?: Parameters<typeof useCurrentUserQuery>[0];
}>;

export function CurrentUserProvider({
  gqlOptions,
  children,
}: CurrentUserProviderProps): JSX.Element {
  const { data: session, status } = useSession();
  const sessionIsLoading = status === 'loading';
  const [{ data, ...restProps }, refetchData] = useCurrentUserQuery({
    ...gqlOptions,
    // @ts-ignore
    variables: { id: session?.user?.id },
  });

  const value = React.useMemo<CurrentUserContextType>(() => {
    // Reset data if session is invalid
    const _data: CurrentUserContextType['data'] = session?.user.id
      ? {
          ...session?.user,
          ...data?.userByPk,
          editableProjectIds: session?.user.editableProjectIds || [],
        }
      : {};
    return {
      ...restProps,
      loading: sessionIsLoading,
      data: _data,
      refetchData,
      isSignIn: !!_data.id,
    };
  }, [data?.userByPk, restProps, refetchData, session, sessionIsLoading]);

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}
