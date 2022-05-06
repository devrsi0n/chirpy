import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { pageRender } from '@chirpy/jest/fixtures/page-render';
import { setMockedUser } from '$/__tests__/mocks/mock-use-current-user';
import { mockNextRouter } from '$/__tests__/mocks/next-router';
import Welcome from '$/pages/auth/welcome';

const mockUpdateUser = jest.fn();
jest.mock('@chirpy/client-graphql/generated/user', () => ({
  ...jest.requireActual('@chirpy/client-graphql/generated/user'),
  useUpdateUserFieldsMutation: () => [
    {
      data: {
        updateUserByPk: {
          __typename: 'User',
          id: 1,
        },
      },
      fetching: false,
    },
    mockUpdateUser,
  ],
}));

setMockedUser({
  email: '',
  name: '',
  username: '',
});

jest.mock('canvas-confetti');

jest.setTimeout(10_000);

describe('Welcome', () => {
  beforeEach(() => {
    pageRender(<Welcome />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    return cleanup();
  });

  it('should render the form and text', () => {
    expect(screen.getByText(/Welcome/)).toBeTruthy();
  });

  it('should call api with filled fields', async () => {
    const email = 'email@test.com';
    const emailInput = screen.getByRole('textbox', { name: /your email/i });
    await userEvent.type(emailInput, email);
    const displayName = 'Test name';
    const displayNameInput = screen.getByLabelText(/your dispaly name/i);
    await userEvent.type(displayNameInput, displayName);
    const userNameInput = screen.getByRole('textbox', { name: /your username/i });
    const userName = 'testuser';
    await userEvent.type(userNameInput, userName);
    const saveButton = screen.getByRole('button', {
      name: /save/i,
    });
    await userEvent.click(saveButton);
    await waitFor(() =>
      expect(mockUpdateUser).toHaveBeenCalledWith({
        id: 'user-id-1',
        email,
        name: displayName,
        username: userName,
      }),
    );

    await waitFor(() => expect(mockNextRouter.push).toHaveBeenCalledWith('/dashboard'), {
      timeout: 3000,
    });
  });
});
