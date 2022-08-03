import { mutate, query } from '$/server/common/gql';
import { AuthorByCommentIdDocument } from '$/server/graphql/generated/comment';
import {
  DeleteNotificationMessageDocument,
  DeleteNotificationMessageMutationVariables,
  InsertOneNotificationMessageDocument,
  InsertOneNotificationMessageMutationVariables,
} from '$/server/graphql/generated/notification';
import { UserByPkDocument } from '$/server/graphql/generated/user';

export function getAuthorByCommentId(commentId: string) {
  return query(
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
  return mutate(
    InsertOneNotificationMessageDocument,
    variables,
    'insertOneNotificationMessage',
  );
}

export function deleteNotificationMessage(
  variables: DeleteNotificationMessageMutationVariables,
) {
  return mutate(
    DeleteNotificationMessageDocument,
    variables,
    'deleteNotificationMessages',
  );
}

export function getUserByPk(id: string) {
  return query(
    UserByPkDocument,
    {
      id,
    },
    'userByPk',
  );
}
