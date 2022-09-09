import { graphql } from 'msw';

export const sbGqlHandlers = [
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
  graphql.query('currentNotificationMessages', (req, res, ctx) => {
    return res(
      ctx.data({
        notificationMessages: [
          {
            id: '4b1e5733-09d1-4a30-94ad-3a759a071b89',
            recipient: {
              id: 'ffd9d667-9b90-4a88-adde-a6dbf80111d0',
              name: 'Qing',
              username: 'qing',
              email: 'qing@chirpy.dev',
              image: 'https://avatars.githubusercontent.com/u/7880675?v=4',
            },
            type: 'ReceivedAComment',
            url: 'http://localhost:3000/play',
            triggeredBy: {
              id: 'ff157d69-2f7d-45c7-a577-1ee073564e60',
              name: 'xia',
              username: 'xia',
              email: 'xia@gmail.com',
              image: 'https://avatars.githubusercontent.com/u/02628451?v=4',
            },
            content: 'testing',
            read: false,
            createdAt: '2022-04-20T12:39:18.284708+00:00',
          },
        ],
      }),
    );
  }),
];
