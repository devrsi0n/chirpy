import * as React from 'react';

import { useCurrentUserQuery } from '$/graphql/generated/user';

type UserQueryResultType = ReturnType<typeof useCurrentUserQuery>;
type UserQueryDataType = NonNullable<UserQueryResultType[0]['data']>;
type UserQueryDataPayload = NonNullable<UserQueryDataType['userByPk']>;
type UserQueryState = Partial<
  Pick<UserQueryResultType[0], 'error' | 'fetching'>
>;

export type UserData = Partial<UserQueryDataPayload>;

export type CurrentUserContextType = UserQueryState & {
  refetchData?: () => void;
  loading: boolean;
  isSignIn: boolean;
  data: UserData & {
    editableProjectIds?: string[];
  };
};

export const CurrentUserContext = React.createContext<CurrentUserContextType>({
  isSignIn: false,
  data: {},
  loading: false,
});
