import { getAdminGqlClient } from '$/lib/admin-gql-client';

import { RecipientByLikeIdDocument } from '../graphql/generated/like';

const client = getAdminGqlClient();
export async function getRecipientByLikeId(likeId: string) {
  const { data, error } = await client
    .query(RecipientByLikeIdDocument, {
      likeId,
    })
    .toPromise();
  if (!data?.likeByPk?.comment || error) {
    throw new Error(`Can't find the comment of the like (${likeId}), error: ${error}`);
  }
  return data.likeByPk;
}
