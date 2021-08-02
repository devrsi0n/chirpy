import { CurrentUserContextType, UserData } from '$/blocks/CurrentUserProvider/CurrentUserContext';

import * as useCurrentUserModule from '../../blocks/CurrentUserProvider/useCurrentUser';
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
      refetch: mockRefetch,
    } as any),
);

export function setMockedUser(data: UserData) {
  useCurrentUser.mockImplementation(
    () =>
      ({
        data: { ...mockUserData, ...data },
        isLogin: true,
        refetch: mockRefetch,
      } as any),
  );
}
