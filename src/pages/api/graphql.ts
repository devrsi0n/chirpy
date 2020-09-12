import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import { NextApiHandler } from 'next';
import { buildSchema } from 'type-graphql';
import { UserResolver } from '$server/resolvers/user.resolver';
import { TeamResolver } from '$server/resolvers/team.resolver';

export const config = {
  api: {
    bodyParser: false,
  },
};

let handler: NextApiHandler;

const isProd = process.env.NODE_ENV === 'production';

const apiHandler: NextApiHandler = async (req, res) => {
  if (handler && isProd) {
    return handler(req, res);
  }

  const schema = await buildSchema({
    resolvers: [UserResolver, TeamResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    playground: !isProd,
    tracing: !isProd,
    context({ req, res }) {
      return {
        req,
        res,
        user: req.user,
      };
    },
  });

  handler = apolloServer.createHandler({
    path: `/api/graphql`,
  });

  return handler(req, res);
};

export default apiHandler;
