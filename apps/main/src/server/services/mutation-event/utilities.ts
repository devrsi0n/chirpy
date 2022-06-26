import { gqlMutate, gqlQuery } from '$/server/common/gql';
import { AuthorByCommentIdDocument } from '$/server/graphql/generated/comment';
import {
  DeleteNotificationMessageDocument,
  DeleteNotificationMessageMutationVariables,
  InsertOneNotificationMessageDocument,
  InsertOneNotificationMessageMutationVariables,
} from '$/server/graphql/generated/notification';
import { UserByPkDocument } from '$/server/graphql/generated/user';

export function getAuthorByCommentId(commentId: string) {
  return gqlQuery(
    AuthorByCommentIdDocument,
    {
      commentId,
    },
    'commentByPk',
  );
}

export function createOneNotificationMessage(
  variables: InsertOneNotificationMessageMutationVariables,
) {
  return gqlMutate(
    InsertOneNotificationMessageDocument,
    variables,
    'insertOneNotificationMessage',
  );
}

export function deleteNotificationMessage(
  variables: DeleteNotificationMessageMutationVariables,
) {
  return gqlMutate(
    DeleteNotificationMessageDocument,
    variables,
    'deleteNotificationMessages',
  );
}

export function getUserByPk(id: string) {
  return gqlQuery(
    UserByPkDocument,
    {
      id,
    },
    'userByPk',
  );
}
