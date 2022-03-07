import { getAdminGqlClient } from '$/lib/admin-gql-client';

import { AuthUserDocument, UserByPkDocument } from '../graphql/generated/user';

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

export async function getAuthUserByPk(id: string) {
  const { data, error } = await client
    .query(AuthUserDocument, {
      id,
    })
    .toPromise();
  if (error || !data?.userByPk) {
    throw new Error(`Can't find the auth user by id (${id}), error: ${error}`);
  }
  return data.userByPk;
}
