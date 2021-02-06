import * as React from 'react';
import { useCurrentUserQuery } from '$/graphql/generated/currentUser';

export const CurrentUserContext = React.createContext<CurrentUserContextType>({
  isLogin: false,
});

export type CurrentUserContextType = Partial<ReturnType<typeof useCurrentUserQuery>> & {
  isLogin: boolean;
};
