import * as React from 'react';

import { CurrentUserProvider } from '$/blocks/CurrentUserProvider';

export type MockCurrentUserProviderProps = React.PropsWithChildren<{
  //
}>;

jest.mock('../../graphql/generated/user', () => ({
  useUserByPkQuery: () => ({
    data: {
      userByPk: {
        id: 'user-id-1',
        username: 'username-1',
        email: 'user@example.com',
        displayName: 'user display name',
        avatar: 'https://avatars.com/1.jpg',
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
      },
    },
    refetch: jest.fn(),
  }),
}));

export function MockCurrentUserProvider({ children }: MockCurrentUserProviderProps): JSX.Element {
  return <CurrentUserProvider>{children}</CurrentUserProvider>;
}
