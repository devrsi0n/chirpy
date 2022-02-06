import { JSONContent } from '@tiptap/react';

import { getAdminGqlClient } from '$/lib/admin-gql-client';
import { AuthorByCommentIdDocument } from '$/server/graphql/generated/comment';

export function getTextFromRteDoc(doc: JSONContent): string {
  let text = '';
  const stack: JSONContent[] = [doc];
  while (stack.length > 0) {
    const node = stack.pop()!;
    if (node.whiteSpace) {
      text += ' ';
    }
    text += node.text || '';
    if (node?.content) {
      node.content[node.content.length - 1].whiteSpace = true;
      for (let i = node.content.length - 1; i >= 0; i--) {
        stack.push(node.content[i]);
      }
    }
  }
  return text.replace(/\s{2,}/g, ' ').trim();
}

const client = getAdminGqlClient();

export async function getAuthorByCommentId(commentId: string) {
  const { data } = await client
    .query(AuthorByCommentIdDocument, {
      commentId,
    })
    .toPromise();
  if (!data?.commentByPk) {
    throw new Error(`Can't find the author of the comment (${commentId})`);
  }
  return data.commentByPk;
}
