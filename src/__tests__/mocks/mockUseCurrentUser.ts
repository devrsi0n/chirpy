import { CurrentUserContextType, UserData } from '$/contexts/CurrentUserProvider/CurrentUserContext';

import * as useCurrentUserModule from '../../contexts/CurrentUserProvider/useCurrentUser';
import { mockUserData } from './CurrentUserProvider';

export const mockRefetch = jest.fn();

const useCurrentUser: jest.SpyInstance<CurrentUserContextType, []> = jest.spyOn(
  useCurrentUserModule,
  'useCurrentUser',
);

useCurrentUser.mockImplementation(
  () =>
    ({
      data: mockUserData,
      isLogin: true,
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
        isLogin: true,
        loading: false,
        refetch: mockRefetch,
      } as any),
  );
}
