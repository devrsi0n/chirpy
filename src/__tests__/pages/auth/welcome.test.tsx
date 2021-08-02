import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { pageRender } from '$/__tests__/fixtures/page-render';
import { setMockedUser } from '$/__tests__/mocks/mockUseCurrentUser';
import { mockNextRouter } from '$/__tests__/mocks/nextRouter';
import Welcome from '$/pages/auth/welcome';

const mockUpdateUser = jest.fn();
jest.mock('../../../graphql/generated/user', () => ({
  ...jest.requireActual('../../../graphql/generated/user'),
  useUpdateUserFieldsMutation: () => [
    mockUpdateUser,
    // @ts-ignore
    {
      data: {
        updateUserByPk: {
          __typename: 'User',
          id: 1,
        },
      },
      loading: false,
    },
  ],
}));

setMockedUser({
  email: '',
  name: '',
  username: '',
});

jest.mock('canvas-confetti');

describe('Welcome', () => {
  beforeEach(() => {
    pageRender(<Welcome />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the form and text', () => {
    expect(screen.getByText(/Welcome/)).toBeTruthy();
  });

  it('should call api with filled fields', async () => {
    const email = 'email@test.com';
    const emailInput = screen.getByRole('textbox', { name: /your email/i });
    userEvent.type(emailInput, email);
    const displayName = 'Test name';
    const displayNameInput = screen.getByLabelText(/your dispaly name/i);
    userEvent.type(displayNameInput, displayName);
    const userNameInput = screen.getByRole('textbox', { name: /your username/i });
    const userName = 'testuser';
    userEvent.type(userNameInput, userName);
    const saveButton = screen.getByRole('button', {
      name: /save/i,
    });
    userEvent.click(saveButton);
    await waitFor(() =>
      expect(mockUpdateUser).toHaveBeenCalledWith({
        variables: {
          id: 'user-id-1',
          email,
          name: displayName,
          username: userName,
        },
      }),
    );

    await waitFor(() => expect(mockNextRouter.push).toHaveBeenCalledWith('/dashboard'), {
      timeout: 3000,
    });
  });
});
