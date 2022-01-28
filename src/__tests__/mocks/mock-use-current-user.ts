import {
  CurrentUserContextType,
  UserData,
} from '$/contexts/current-user-context/current-user-context';

import * as useCurrentUserModule from '../../contexts/current-user-context/use-current-user';
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
