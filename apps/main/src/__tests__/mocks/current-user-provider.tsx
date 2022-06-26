import * as React from 'react';

import { CurrentUserProvider } from '$/contexts/current-user-context';

import * as userModule from '../../graphql/generated/user';
import { mockUserData } from './data/user';

export type MockCurrentUserProviderProps = React.PropsWithChildren<{
  //
}>;

jest.spyOn(userModule, 'useCurrentUserQuery').mockReturnValue([
  {
    data: {
      // @ts-ignore
      userByPk: mockUserData,
    },
    fetching: false,
    stale: false,
  },
  jest.fn(),
]);

export function MockCurrentUserProvider({
  children,
}: MockCurrentUserProviderProps): JSX.Element {
  return <CurrentUserProvider>{children}</CurrentUserProvider>;
}
