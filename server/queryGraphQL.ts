import { DocumentNode, execute, ExecutionResult } from 'graphql';
import superjson from 'superjson';
import { NextApiRequest, NextApiResponse } from 'next';

import { schema } from './schema';
import { createContext } from './context';

export async function queryGraphql<
  TData = { [key: string]: $TsAny },
  TVariables = { [key: string]: $TsAny },
  TExtensions = { [key: string]: $TsAny }
>(
  query: DocumentNode,
  variableValues: TVariables,
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<ExecutionResult<TData, TExtensions>> {
  const result = await execute({
    schema,
    document: query,
    variableValues,
    contextValue: createContext(req, res),
  });
  return superjson.parse<ExecutionResult<TData, TExtensions>>(superjson.stringify(result));
}
