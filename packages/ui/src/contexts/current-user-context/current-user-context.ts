import { Nullable } from '@chirpy-dev/types';
import { Session } from 'next-auth';
import * as React from 'react';
import { OperationContext } from 'urql';

export type UserData = Nullable<Session['user']>;

export type CurrentUserContextType = {
  refetchUser?: (opts?: Partial<OperationContext> | undefined) => void;
  loading: boolean;
  isSignIn: boolean;
  data: UserData & {
    editableProjectIds?: string[];
  };
};

export const EMPTY_CURRENT_USER_CONTEXT: CurrentUserContextType = {
  isSignIn: false,
  data: {},
  loading: true,
};

export const CurrentUserContext = React.createContext<CurrentUserContextType>(
  EMPTY_CURRENT_USER_CONTEXT,
);
