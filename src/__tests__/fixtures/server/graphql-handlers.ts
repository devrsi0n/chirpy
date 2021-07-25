import { graphql } from 'msw';

// const localGraphQL = graphql.link('http://localhost:3000/v1/graphql');

export const graphqlHandlers = [
  graphql.query('userByPk', (req, res, ctx) => {
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
