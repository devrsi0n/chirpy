import { getAdminGqlClient } from '$/lib/admin-gql-client';
import { CommentListDocument } from '$/server/graphql/generated/comment';

export async function getComment() {
  const client = getAdminGqlClient();
  try {
    const { data } = await client.query(CommentListDocument).toPromise();
    return data?.comments;
  } catch (error) {
    console.warn(`query comments error: ${error}`);
    return null;
  }
}
