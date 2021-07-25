import { mockUserData } from './CurrentUserProvider';

jest.mock('../../blocks/CurrentUserProvider/useCurrentUser', () => ({
  ...jest.requireActual('../../blocks/CurrentUserProvider/useCurrentUser'),
  useCurrentUser: () => ({
    data: mockUserData,
    isLogin: true,
    refetch: jest.fn(),
  }),
}));
