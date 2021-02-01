import { DocumentNode, execute, ExecutionResult } from 'graphql';
import superjson from 'superjson';

import { schema } from './schema';
import { createContext } from './context';

export async function queryGraphql<
  TData = { [key: string]: $TsAny },
  TVariables = { [key: string]: $TsAny },
  TExtensions = { [key: string]: $TsAny }
>(query: DocumentNode, variableValues: TVariables): Promise<ExecutionResult<TData, TExtensions>> {
  const result = await execute({
    schema,
    document: query,
    variableValues,
    contextValue: createContext(),
  });
  return superjson.parse<ExecutionResult<TData, TExtensions>>(superjson.stringify(result));
}
