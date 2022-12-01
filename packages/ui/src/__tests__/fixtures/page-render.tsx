import { render as reactRender } from '@testing-library/react';

import { ToastProvider } from '../../components';
// import '../mocks/next-router';
import { CurrentUserContext, UserData } from '../../contexts';
import { trpcClient } from '../../utilities';
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
    wrapper: Wrapper,
  });
}

function Wrapper({ children }: { children: React.ReactElement }): JSX.Element {
  // @ts-ignore
  return <TrpcWrapper Component={() => children} pageProps={{}} />;
}

const TrpcWrapper = trpcClient.withTRPC(function TestingWrapper({ Component }) {
  const mockedUser = getMockedUser();
  return (
    <CurrentUserContext.Provider value={mockedUser}>
      <ToastProvider>
        <Component />
      </ToastProvider>
    </CurrentUserContext.Provider>
  );
});
