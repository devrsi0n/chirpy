import * as React from 'react';

import { CurrentUserProvider } from '$/contexts/current-user-provider';

import * as userModule from '../../graphql/generated/user';
import { EDITABLE_PROJECT_IDS } from './editable-project-ids';

export type MockCurrentUserProviderProps = React.PropsWithChildren<{
  //
}>;

export const mockUserData = {
  id: 'user-id-1',
  username: 'username-1',
  email: 'user@example.com',
  name: 'user display name',
  avatar: 'https://avatars.com/1.jpg',
  bio: 'this is a testing bio',
  website: 'https://www.example.com',
  twitterUserName: 'test',
  members: [],
  projects: [
    {
      id: 'project-id',
      name: 'project-name',
      createdAt: '2021-06-21T14:12:13.813625+00:00',
      pages: [
        {
          id: 'page-id',
          title: 'page-title',
          url: 'http://page.com',
        },
      ],
    },
  ],
  editableProjectIds: EDITABLE_PROJECT_IDS,
};

jest.spyOn(userModule, 'useCurrentUserQuery').mockReturnValue([
  {
    data: {
      // @ts-ignore
      userByPk: mockUserData,
    },
    fetching: false,
    stale: false,
  },
  jest.fn(),
]);

export function MockCurrentUserProvider({ children }: MockCurrentUserProviderProps): JSX.Element {
  return <CurrentUserProvider>{children}</CurrentUserProvider>;
}
