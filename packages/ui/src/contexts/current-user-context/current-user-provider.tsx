import { TOKEN_KEY } from '@chirpy-dev/utils';
import { useSession } from 'next-auth/react';
import * as React from 'react';

import { useHasMounted } from '../../hooks/use-has-mounted';
import type { SignInSuccess } from '../../hooks/use-sign-in-window';
import {
  CurrentUserContext,
  CurrentUserContextType,
  EMPTY_CURRENT_USER_CONTEXT,
} from './current-user-context';

export type CurrentUserProviderProps = {
  isWidget: boolean;
  children: React.ReactNode;
};

export function CurrentUserProvider({
  children,
  isWidget,
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
      isPaid: ['PRO', 'ENTERPRISE'].includes(data?.plan || ''),
    };
  }, [hasMounted, session?.user, sessionIsLoading, update]);

  React.useEffect(() => {
    if (session?.jwt) {
      if (isWidget) {
        // Refresh token
        localStorage.setItem(TOKEN_KEY, session.jwt);
      } else {
        window.opener?.postMessage(
          { type: 'sign-in-success', jwt: session.jwt } satisfies SignInSuccess,
          '*',
        );
      }
    }
  }, [session?.jwt, isWidget]);

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}
