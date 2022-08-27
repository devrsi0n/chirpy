import { Session } from 'next-auth';
import * as React from 'react';

import { Nullable } from '$/types/utilities.type';

export type UserData = Nullable<Session['user']>;

export type CurrentUserContextType = {
  refetchData?: () => void;
  loading: boolean;
  isSignIn: boolean;
  data: UserData & {
    editableProjectIds?: string[];
  };
};

export const EMPTY_CURRENT_USER_CONTEXT: CurrentUserContextType = {
  isSignIn: false,
  data: {},
  loading: false,
};

export const CurrentUserContext = React.createContext<CurrentUserContextType>(
  EMPTY_CURRENT_USER_CONTEXT,
);
