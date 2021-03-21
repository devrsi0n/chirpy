import * as React from 'react';

import { useUserByPkQuery } from '$/graphql/generated/user';

type UserQueryResultType = ReturnType<typeof useUserByPkQuery>;
type UserQueryDataType = NonNullable<UserQueryResultType['data']>;
type UserQueryDataPayload = Partial<UserQueryDataType['userByPk']>;
type UserQueryState = Partial<
  Pick<UserQueryResultType, 'previousData' | 'error' | 'loading' | 'refetch'>
>;

export type CurrentUserContextType = UserQueryDataPayload &
  UserQueryState & {
    isLogin: boolean;
  };

export const CurrentUserContext = React.createContext<CurrentUserContextType>({
  isLogin: false,
});
