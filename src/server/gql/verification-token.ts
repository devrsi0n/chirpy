import { getAdminGqlClient } from '$/lib/admin-gql-client';

import {
  DeleteVerificationTokenDocument,
  DeleteVerificationTokenMutationVariables,
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

export async function deleteVerificationToken(variables: DeleteVerificationTokenMutationVariables) {
  const { data, error } = await client
    .mutation(DeleteVerificationTokenDocument, variables)
    .toPromise();
  if (error) {
    console.error(`Delete verification token error: ${error}`);
  }
  if (!data?.deleteVerificationTokens) {
    throw new Error(`Delete verification token failed, data: ${data}`);
  }
  // console.log(`Delete verification token success, data: ${JSON.stringify(data, null, 2)}`);
  return data.deleteVerificationTokens;
}
