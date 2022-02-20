import { getAdminGqlClient } from '$/lib/admin-gql-client';
import {
  CommentListDocument,
  AuthorByCommentIdDocument,
  SiteOwnerByTriggerCommentIdDocument,
} from '$/server/graphql/generated/comment';

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

export async function getSiteOwnerByTriggeredCommentId(commentId: string) {
  const { data, error } = await client
    .query(SiteOwnerByTriggerCommentIdDocument, {
      commentId,
    })
    .toPromise();

  if (!data?.commentByPk || error) {
    throw new Error(`Can't find the owner of the comment (${commentId}), error: ${error}`);
  }
  return data.commentByPk;
}

export async function getComment(limit: number, offset: number) {
  const client = getAdminGqlClient();
  try {
    const { data } = await client.query(CommentListDocument, { limit, offset }).toPromise();
    return data?.comments;
  } catch (error) {
    console.warn(`query comments error: ${error}`);
    return null;
  }
}
