import * as React from 'react';

import { useCurrentUserQuery } from '$/graphql/generated/user';

type UserQueryResultType = ReturnType<typeof useCurrentUserQuery>;
type UserQueryDataType = NonNullable<UserQueryResultType['data']>;
type UserQueryDataPayload = NonNullable<UserQueryDataType['userByPk']>;
type UserQueryState = Partial<
  Pick<UserQueryResultType, 'previousData' | 'error' | 'loading' | 'refetch'>
>;

export type UserData = Partial<UserQueryDataPayload>;

export type CurrentUserContextType = UserQueryState & {
  refetchData?: () => void;
} & {
  isSignIn: boolean;
  data: UserData & {
    editableProjectIds?: string[];
  };
};

export const CurrentUserContext = React.createContext<CurrentUserContextType>({
  isSignIn: false,
  data: {},
});
