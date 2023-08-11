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
  const { data: session, status: sessionStatus, update } = useSession();
  const sessionIsLoading = sessionStatus === 'loading';
  const hasMounted = useHasMounted();
  const value = React.useMemo<CurrentUserContextType>(() => {
    if (!hasMounted) {
      // Only return valid date on client side to fix the hydration mismatch issue
      return EMPTY_CURRENT_USER_CONTEXT;
    }
    // Reset data if session is invalid
    const data: CurrentUserContextType['data'] = session?.user.id
      ? {
          ...session?.user,
          editableProjectIds: session?.user.editableProjectIds || [],
        }
      : {};
    return {
      data,
      loading: sessionIsLoading,
      isSignIn: !!data.id,
      refetchUser: update,
      isPaid: ['HOBBY', 'ENTERPRISE'].includes(data?.plan || ''),
    };
  }, [hasMounted, session?.user, sessionIsLoading, update]);

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}
