import { ApolloQueryResult } from '@apollo/client';
import * as React from 'react';

import { UserByPkQuery, useUserByPkQuery } from '$/graphql/generated/user';

type UserQueryResultType = ReturnType<typeof useUserByPkQuery>;
type UserQueryDataType = NonNullable<UserQueryResultType['data']>;
type UserQueryDataPayload = Partial<UserQueryDataType['userByPk']>;
type UserQueryState = Partial<
  Pick<UserQueryResultType, 'previousData' | 'error' | 'loading' | 'refetch'>
>;

export type CurrentUserContextType = UserQueryDataPayload &
  UserQueryState & {
    isLogin: boolean;
    refetchData?: () => Promise<ApolloQueryResult<UserByPkQuery>>;
  };

export const CurrentUserContext = React.createContext<CurrentUserContextType>({
  isLogin: false,
});
