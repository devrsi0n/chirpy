import { trpc } from '@chirpy-dev/trpc/src/client';
import { useSession } from 'next-auth/react';
import * as React from 'react';

import { useHasMounted } from '../../hooks/use-has-mounted';
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
  const { data: session, status: sessionStatus } = useSession();
  const sessionIsLoading = sessionStatus === 'loading';
  const {
    data,
    isFetching,
    refetch: refetchUser,
  } = trpc.user.me.useQuery(undefined, {
    enabled: !!session?.user.id,
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
          ...data,
          editableProjectIds: session?.user.editableProjectIds || [],
        }
      : {};
    return {
      data: _data,
      loading: sessionIsLoading || isFetching,
      isSignIn: !!_data.id,
      refetchUser: refetchUser,
      isPaid: _data.plan === 'PRO' || _data.plan === 'ENTERPRISE',
    };
  }, [
    hasMounted,
    session?.user,
    data,
    sessionIsLoading,
    isFetching,
    refetchUser,
  ]);

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}
