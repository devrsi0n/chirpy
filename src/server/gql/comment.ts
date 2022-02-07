import { getAdminGqlClient } from '$/lib/admin-gql-client';
import { AuthorByCommentIdDocument } from '$/server/graphql/generated/comment';

const client = getAdminGqlClient();

export async function getAuthorByCommentId(commentId: string) {
  const { data, error } = await client
    .query(AuthorByCommentIdDocument, {
      commentId,
    })
    .toPromise();
  if (!data?.commentByPk || error) {
    throw new Error(`Can't find the author of the comment (${commentId}), error: ${error}`);
  }
  return data.commentByPk;
}
