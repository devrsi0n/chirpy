import { QueryHookOptions } from '@apollo/client';
import Cookies from 'js-cookie';
import * as React from 'react';

import { UserByPkQuery, UserByPkQueryVariables, useUserByPkQuery } from '$/graphql/generated/user';

import { USER_COOKIE_NAME } from '$shared/constants';

import { CurrentUserContext, CurrentUserContextType } from './CurrentUserContext';

export type CurrentUserProviderProps = React.PropsWithChildren<{
  apolloBaseOptions?: QueryHookOptions<UserByPkQuery, UserByPkQueryVariables>;
}>;

export function CurrentUserProvider(props: CurrentUserProviderProps): JSX.Element {
  const { data, refetch, ...restProps } = useUserByPkQuery({
    ...props.apolloBaseOptions,
    variables: {
      id: getId(),
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });
  const value = React.useMemo<CurrentUserContextType>(
    () => ({
      ...restProps,
      ...data?.userByPk,
      refetchData: () =>
        refetch({
          id: getId(),
        }),
      isLogin: !!data?.userByPk?.id,
    }),
    [data, restProps, refetch],
  );

  return <CurrentUserContext.Provider value={value}>{props.children}</CurrentUserContext.Provider>;
}

function getId(): string {
  return typeof window !== 'undefined' ? atob(Cookies.get(USER_COOKIE_NAME) || '') : '';
}
