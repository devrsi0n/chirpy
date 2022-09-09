import { DocumentNode } from 'graphql';
import { log } from 'next-axiom';
import { TypedDocumentNode } from 'urql';

import { getAdminGqlClient } from '$/lib/admin-gql-client';

const client = getAdminGqlClient();

/**
 * Run a graphql query on the admin gql client, it handles the error and makes sure data exists
 * @param query Document query
 * @param variables Query variables
 * @param path Data path of the result data, e.g. `insertOneUser`
 */
export async function query<
  Data extends AnyObject = AnyObject,
  Variables extends AnyObject = AnyObject,
  Path extends keyof Data = keyof Data,
>(
  query: DocumentNode | TypedDocumentNode<Data, Variables> | string,
  variables: Variables,
  path: Path,
): Promise<NonNullable<Data[Path]>> {
  const { data, error } = await client.query(query, variables).toPromise();
  if (!data || !data[path] || error) {
    const message = `GQL query error, error: ${error}, data: ${data}`;
    log.error(message);
    throw new Error(message);
  }
  return data[path] as NonNullable<Data[Path]>;
}

/**
 * Run a graphql mutation on the admin gql client, it handles the error and makes sure data exists
 * @param mutation Document mutation
 * @param variables Mutation variables
 * @param path Data path of the result data, e.g. `insertOneUser`
 */
export async function mutate<
  Data extends AnyObject = AnyObject,
  Variables extends AnyObject = AnyObject,
  Path extends keyof Data = keyof Data,
>(
  mutation: DocumentNode | TypedDocumentNode<Data, Variables> | string,
  variables: Variables,
  path: Path,
): Promise<NonNullable<Data[Path]>> {
  const { data, error } = await client
    .mutation(mutation, variables)
    .toPromise();
  if (!data || !data[path] || error) {
    const message = `GQL mutation error, error: ${error}, data: ${data}`;
    log.error(message);
    throw new Error(message);
  }
  return data[path] as NonNullable<Data[Path]>;
}
