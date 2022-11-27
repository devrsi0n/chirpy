import * as React from 'react';

import { CurrentUserProvider } from '../../contexts';
import { trpcClient } from '../../utilities/trpc-client';
import { mockUserData } from './data/user';

export type MockCurrentUserProviderProps = React.PropsWithChildren<{
  //
}>;

jest.spyOn(trpcClient.user.me, 'useQuery').mockReturnValue({
  data: mockUserData,
  status: 'success',
} as any);

export function MockCurrentUserProvider({
  children,
}: MockCurrentUserProviderProps): JSX.Element {
  return <CurrentUserProvider>{children}</CurrentUserProvider>;
}
