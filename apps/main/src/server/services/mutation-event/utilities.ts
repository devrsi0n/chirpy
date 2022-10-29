import {
  AuthorByCommentIdDocument,
  DeleteNotificationMessageDocument,
  DeleteNotificationMessageMutationVariables,
  InsertOneNotificationMessageDocument,
  InsertOneNotificationMessageMutationVariables,
  UserByPkDocument,
} from '@chirpy-dev/graphql';

import { mutate, query } from '$/server/common/gql';

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
