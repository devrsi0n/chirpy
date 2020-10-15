import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { createParamDecorator } from 'type-graphql';

export type TGqlContext = {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
};

export function GqlContext(): ParameterDecorator {
  return createParamDecorator<TGqlContext>(({ context }) => context);
}
