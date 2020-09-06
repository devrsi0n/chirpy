import { NextApiRequest, NextApiResponse } from 'next'
import { createParamDecorator } from 'type-graphql'

export type TGqlContext = {
  req: NextApiRequest
  res: NextApiResponse
}

export function GqlContext() {
  return createParamDecorator<TGqlContext>(({ context }) => context)
}
