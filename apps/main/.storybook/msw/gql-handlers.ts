import { graphql } from 'msw';

const localGraphQL = graphql.link('*/v1/graphql');

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
          avatar: 'https://avater.test',
          bio: 'This is a bio for testing',
          website: 'https://test.com',
          twitterUserName: 'twittertest',
        },
      }),
    );
  }),
];
