import { useSession } from 'next-auth/react';
import * as React from 'react';

import { useCurrentUserQuery } from '$/graphql/generated/user';
import { useHasMounted } from '$/hooks/use-has-mounted';

import {
  CurrentUserContext,
  CurrentUserContextType,
  EMPTY_CURRENT_USER_CONTEXT,
} from './current-user-context';

export type CurrentUserProviderProps = {
  children: React.ReactNode;
};

export function CurrentUserProvider({
  children,
}: CurrentUserProviderProps): JSX.Element {
  const { data: session, status } = useSession();
  const sessionIsLoading = status === 'loading';
  const [{ data: queryData, fetching }, refetchUser] = useCurrentUserQuery({
    variables: { id: session?.user.id || '-1' },
    pause: true,
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
          ...queryData?.userByPk,
          editableProjectIds: session?.user.editableProjectIds || [],
        }
      : {};
    return {
      data: _data,
      loading: sessionIsLoading || fetching,
      isSignIn: !!_data.id,
      refetchUser,
    };
  }, [
    session,
    sessionIsLoading,
    hasMounted,
    refetchUser,
    fetching,
    queryData?.userByPk,
  ]);

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}
