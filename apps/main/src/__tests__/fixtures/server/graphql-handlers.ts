import { graphql } from 'msw';

const localGraphQL = graphql.link('*/v1/graphql');

export const graphqlHandlers = [
  localGraphQL.query('currentUser', (req, res, ctx) => {
    const { id } = req.variables;
    return res(
      ctx.data({
        userByPk: {
          __typename: 'User',
          id,
          email: 'email@test.com',
          username: 'testusername',
          name: 'Test user',
          avatar: 'https://avater.test',
          bio: 'This is a bio for testing',
          website: 'https://test.com',
          twitterUserName: 'twittertest',
        },
      }),
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
