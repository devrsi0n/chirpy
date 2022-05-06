import { CurrentUserContextType, UserData } from '@chirpy/contexts';

import * as useCurrentUserModule from '@chirpy/contexts/src/current-user-context/use-current-user';
import { mockUserData } from './current-user-provider';

export const mockRefetch = jest.fn();

const useCurrentUser: jest.SpyInstance<CurrentUserContextType, []> = jest.spyOn(
  useCurrentUserModule,
  'useCurrentUser',
);

useCurrentUser.mockImplementation(
  () =>
    ({
      data: mockUserData,
      isSignIn: true,
      loading: false,
      refetch: mockRefetch,
    } as any),
);

export function setMockedUser(newData: UserData) {
  const data = { ...mockUserData, ...newData };
  useCurrentUser.mockImplementation(
    () =>
      ({
        data,
        isSignIn: true,
        loading: false,
        refetch: mockRefetch,
      } as any),
  );
}
