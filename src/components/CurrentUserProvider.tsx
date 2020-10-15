import * as React from 'react';
import { CurrentUserContext } from '$/context/CurrentUserContext';
import { CurrentUserQuery, Exact, useCurrentUserQuery } from '$/generated/graphql';
import { QueryHookOptions } from '@apollo/client';

export type CurrentUserProviderProps = React.PropsWithChildren<{
  apolloBaseOptions?: QueryHookOptions<
    CurrentUserQuery,
    Exact<{
      [key: string]: never;
    }>
  >;
}>;

export function CurrentUserProvider(props: CurrentUserProviderProps): JSX.Element {
  const { data, ...restProps } = useCurrentUserQuery(props.apolloBaseOptions);
  const value = React.useMemo(
    () => ({
      ...restProps,
      data,
      isLogin: !!data?.currentUser,
    }),
    [data, restProps],
  );
  return <CurrentUserContext.Provider value={value}>{props.children}</CurrentUserContext.Provider>;
}
