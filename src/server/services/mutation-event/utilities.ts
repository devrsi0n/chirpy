import { JSONContent } from '@tiptap/react';

import { gqlMutate, gqlQuery } from '$/server/common/gql';
import { AuthorByCommentIdDocument } from '$/server/graphql/generated/comment';
import {
  DeleteNotificationMessageDocument,
  DeleteNotificationMessageMutationVariables,
  InsertOneNotificationMessageDocument,
  InsertOneNotificationMessageMutationVariables,
} from '$/server/graphql/generated/notification';
import { UserByPkDocument } from '$/server/graphql/generated/user';

export function getTextFromRteDoc(doc: JSONContent): string {
  let text = '';
  const stack: JSONContent[] = [doc];
  while (stack.length > 0) {
    const node = stack.pop();
    if (node?.whiteSpace) {
      text += ' ';
    }
    text += node?.text || '';
    if (node?.content) {
      node.content[node.content.length - 1].whiteSpace = true;
      for (let i = node.content.length - 1; i >= 0; i--) {
        stack.push(node.content[i]);
      }
    }
  }
  return text.replace(/\s{2,}/g, ' ').trim();
}

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
  return gqlMutate(InsertOneNotificationMessageDocument, variables, 'insertOneNotificationMessage');
}

export function deleteNotificationMessage(variables: DeleteNotificationMessageMutationVariables) {
  return gqlMutate(DeleteNotificationMessageDocument, variables, 'deleteNotificationMessages');
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
