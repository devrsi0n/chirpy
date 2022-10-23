import * as React from 'react';

import { CurrentUserProvider } from 'ui';

import * as userModule from '@chirpy-dev/graphql';
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
