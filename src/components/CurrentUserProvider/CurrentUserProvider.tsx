import { QueryHookOptions } from '@apollo/client';
import Cookies from 'js-cookie';
import * as React from 'react';

import { CurrentUserContext, CurrentUserContextType } from '$/context/CurrentUserContext';
import { UserByPkQuery, UserByPkQueryVariables, useUserByPkQuery } from '$/graphql/generated/user';

import { USER_COOKIE_NAME } from '$shared/constants';

export type CurrentUserProviderProps = React.PropsWithChildren<{
  apolloBaseOptions?: QueryHookOptions<UserByPkQuery, UserByPkQueryVariables>;
}>;

export function CurrentUserProvider(props: CurrentUserProviderProps): JSX.Element {
  const { data, ...restProps } = useUserByPkQuery({
    ...props.apolloBaseOptions,
    variables: {
      id: getId(),
    },
    fetchPolicy: 'network-only',
  });
  const value = React.useMemo<CurrentUserContextType>(
    () => ({
      ...restProps,
      ...data?.userByPk,
      isLogin: !!data?.userByPk?.id,
    }),
    [data, restProps],
  );

  return <CurrentUserContext.Provider value={value}>{props.children}</CurrentUserContext.Provider>;
}

function getId(): string {
  return typeof window !== 'undefined' ? atob(Cookies.get(USER_COOKIE_NAME) || '') : '';
}
