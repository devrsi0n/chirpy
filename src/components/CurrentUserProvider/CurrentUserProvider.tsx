import * as React from 'react';
import { CurrentUserContext } from '$/context/CurrentUserContext';
import {
  CurrentUserQuery,
  useCurrentUserQuery,
  CurrentUserQueryVariables,
} from '$/graphql/generated/currentUser';
import { QueryHookOptions } from '@apollo/client';

export type CurrentUserProviderProps = React.PropsWithChildren<{
  apolloBaseOptions?: QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>;
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
