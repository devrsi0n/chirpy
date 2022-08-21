import { useSession } from 'next-auth/react';
import * as React from 'react';

import { useCurrentUserQuery } from '$/graphql/generated/user';
import { useHasMounted } from '$/hooks/use-has-mounted';

import {
  CurrentUserContext,
  CurrentUserContextType,
  EMPTY_CURRENT_USER_CONTEXT,
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
    variables: { id: session?.user?.id || '-1' },
  });
  const hasMounted = useHasMounted();
  const value = React.useMemo<CurrentUserContextType>(() => {
    if (!hasMounted) {
      // Only return valid date on client side to fix the hydration mismatch issue
      return EMPTY_CURRENT_USER_CONTEXT;
    }

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
  }, [
    data?.userByPk,
    restProps,
    refetchData,
    session,
    sessionIsLoading,
    hasMounted,
  ]);

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}
