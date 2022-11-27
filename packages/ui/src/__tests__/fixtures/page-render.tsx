import { render as reactRender } from '@testing-library/react';

import { ToastProvider } from '../../components';
// import '../mocks/next-router';
import { CurrentUserContext, UserData } from '../../contexts';
import { mockUserData } from '../mocks/data/user';

export const mockRefetchUser = jest.fn();
const DEFAULT_USER_DATA = {
  data: mockUserData,
  isSignIn: true,
  loading: false,
  refetchUser: mockRefetchUser,
};

const getMockedUser = jest.fn().mockReturnValue(DEFAULT_USER_DATA);

export function setMockedUser(newData: UserData) {
  getMockedUser.mockReturnValue({
    ...DEFAULT_USER_DATA,
    data: {
      ...DEFAULT_USER_DATA.data,
      ...newData,
    },
  });
}

export function pageRender(ui: React.ReactElement) {
  return reactRender(ui, {
    wrapper: function TestingWrapper({ children }) {
      const mockedUser = getMockedUser();
      return (
        <CurrentUserContext.Provider value={mockedUser}>
          <ToastProvider>{children}</ToastProvider>
        </CurrentUserContext.Provider>
      );
    },
  });
}
