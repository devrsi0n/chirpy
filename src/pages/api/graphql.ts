import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import { NextApiHandler } from 'next';
import { buildSchema } from 'type-graphql';
import { prisma } from '$server/prisma';
import { UserResolver } from '$server/resolvers/user.resolver';
import { ProjectResolver } from '$server/resolvers/project.resolver';

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
    resolvers: [UserResolver, ProjectResolver],
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
        prisma,
      };
    },
    cacheControl: {
      defaultMaxAge: isProd ? 10 : 0,
    },
  });

  handler = apolloServer.createHandler({
    path: `/api/graphql`,
  });

  return handler(req, res);
};

export default apiHandler;
