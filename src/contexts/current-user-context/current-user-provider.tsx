import { useSession } from 'next-auth/react';
import * as React from 'react';

import { useCurrentUserQuery } from '$/graphql/generated/user';

import { CurrentUserContext, CurrentUserContextType } from './current-user-context';

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

  const value = React.useMemo<CurrentUserContextType>(() => {
    return {
      ...restProps,
      loading: sessionIsLoading || restProps.fetching,
      data: {
        ...session?.user,
        ...data?.userByPk,
        editableProjectIds: session?.user.editableProjectIds || [],
      },
      refetchData,
      isSignIn: !!data?.userByPk?.id,
    };
  }, [data?.userByPk, restProps, refetchData, session, sessionIsLoading]);

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
}
