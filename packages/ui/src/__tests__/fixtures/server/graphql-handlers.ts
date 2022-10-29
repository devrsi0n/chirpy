import {
  CurrentNotificationMessagesQuery,
  CurrentNotificationMessagesQueryVariables,
} from '@chirpy-dev/graphql';
import { graphql } from 'msw';

import { mockNotificationData } from '../../mocks/data/notification-data';

export const graphqlHandlers = [
  graphql.query('currentUser', (req, res, ctx) => {
    const { id } = req.variables;
    return res(
      ctx.data({
        userByPk: {
          __typename: 'User',
          id,
          email: 'email@test.com',
          username: 'testusername',
          name: 'Test user',
          image: 'https://avater.test',
          bio: 'This is a bio for testing',
          website: 'https://test.com',
          twitterUserName: 'twittertest',
        },
      }),
    );
  }),
  graphql.query<
    CurrentNotificationMessagesQuery,
    CurrentNotificationMessagesQueryVariables
  >('currentNotificationMessages', (req, res, ctx) => {
    return res(
      ctx.data(mockNotificationData as CurrentNotificationMessagesQuery),
    );
  }),
  graphql.query('pageByURL', (req, res, ctx) => {
    const { url, title } = req.variables;
    return res(
      ctx.data({
        pages: [
          {
            __typename: 'Page',
            id: 'page-id',
            url,
            title,
            project: {
              domain: 'test.com',
            },
          },
        ],
      }),
    );
  }),
  graphql.mutation('updateUserFields', (req, res, ctx) => {
    return res(
      ctx.data({
        updateUserByPk: {
          __typename: 'User',
          id: 'user-id',
        },
      }),
    );
  }),
];
