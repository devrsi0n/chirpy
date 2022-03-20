import { getAdminGqlClient } from '$/lib/admin-gql-client';

import {
  InsertOneVerificationTokenDocument,
  InsertOneVerificationTokenMutationVariables,
} from '../graphql/generated/verification-token';

const client = getAdminGqlClient();

export async function insertOneVerificationToken(
  variable: InsertOneVerificationTokenMutationVariables,
) {
  const { data, error } = await client
    .mutation(InsertOneVerificationTokenDocument, variable)
    .toPromise();
  if (error) {
    console.error(`Insert one verification token error: ${error}`);
  }
  if (!data?.insertOneVerificationToken) {
    throw new Error('Insert one verification token failed');
  }
  return data.insertOneVerificationToken;
}
