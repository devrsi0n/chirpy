import { Nullable } from '@chirpy-dev/types';
import { asyncNoop } from '@chirpy-dev/utils';
import { Session } from 'next-auth';
import * as React from 'react';

import { trpcClient } from '../../utilities/trpc-client';

export type UserData = Nullable<Session['user']>;

export type CurrentUserContextType = {
  refetchUser: ReturnType<typeof trpcClient.user.me.useQuery>['refetch'];
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
  // @ts-ignore
  refetchUser: asyncNoop,
};

export const CurrentUserContext = React.createContext<CurrentUserContextType>(
  EMPTY_CURRENT_USER_CONTEXT,
);
