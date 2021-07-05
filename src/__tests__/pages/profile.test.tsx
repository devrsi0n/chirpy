import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as graphQlUserModule from '$/graphql/generated/user';

import Profile from '../../pages/profile';
import { pageRender } from '../fixtures/render';
import { mockUserData } from '../mocks/CurrentUserProvider';

const mockUpdateUser = jest.fn();

jest.spyOn(graphQlUserModule, 'useUpdateUserByPkMutation').mockImplementation(
  // @ts-ignore
  () => [
    mockUpdateUser,
    {
      data: {
        updateUserByPk: mockUserData,
      },
      loading: false,
    },
  ],
);

describe('Profile page', () => {
  beforeEach(() => {
    pageRender(<Profile />);
  });

  afterAll(() => {
    jest.resetAllMocks();
    return cleanup();
  });

  it('should render the text, links and avatar', () => {
    expect(screen.getByText(mockUserData.displayName)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockUserData.username))).toBeInTheDocument();
    expect(screen.getByText(mockUserData.bio)).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: mockUserData.website,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: new RegExp(mockUserData.twitterUserName),
      }),
    ).toBeInTheDocument();
  });

  it('should save profile', async () => {
    const editButton = screen.getByRole('button', {
      name: /edit profile/i,
    });
    userEvent.click(editButton);
    const nameInput = screen.getByRole('textbox', {
      name: /name/i,
    });
    const newName = 'This is the new name';
    userEvent.clear(nameInput);
    userEvent.type(nameInput, newName);
    const bioInput = screen.getByRole('textbox', {
      name: /bio/i,
    });
    const newBio = 'This is the new bio';
    userEvent.clear(bioInput);
    userEvent.type(bioInput, newBio);
    const websiteInput = screen.getByRole('textbox', {
      name: /website/i,
    });
    const newWebsite = 'new.example.com';
    userEvent.clear(websiteInput);
    userEvent.type(websiteInput, newWebsite);
    const twitterInput = screen.getByRole('textbox', {
      name: /twitter/i,
    });
    const newTwitter = 'test-twitter';
    userEvent.clear(twitterInput);
    userEvent.type(twitterInput, newTwitter);

    const saveButton = screen.getByRole('button', {
      name: /save/i,
    });
    userEvent.click(saveButton);

    await waitFor(() =>
      expect(mockUpdateUser).toHaveBeenCalledWith({
        variables: {
          id: mockUserData.id,
          displayName: newName,
          bio: newBio,
          website: newWebsite,
          twitterUserName: newTwitter,
        },
      }),
    );
  });
});
