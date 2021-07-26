import * as useCurrentUserModule from '../../blocks/CurrentUserProvider/useCurrentUser';
import { mockUserData } from './CurrentUserProvider';

jest.spyOn(useCurrentUserModule, 'useCurrentUser').mockImplementation(
  () =>
    ({
      data: mockUserData,
      isLogin: true,
      refetch: jest.fn(),
    } as any),
);
