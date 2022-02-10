import { getAdminGqlClient } from '$/lib/admin-gql-client';

import { UserByPkDocument } from '../graphql/generated/user';

const client = getAdminGqlClient();

export async function getUserByPk(id: string) {
  const { data, error } = await client
    .query(UserByPkDocument, {
      id,
    })
    .toPromise();
  if (error || !data?.userByPk) {
    throw new Error(`Can't find the user by id (${id}), error: ${error}`);
  }
  return data.userByPk;
}
