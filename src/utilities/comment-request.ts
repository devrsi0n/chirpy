import { DocumentNode, gql } from '@apollo/client';

const COMMENT_FIELDS = `{
  id
  content
  createdAt
  parentId
  pageId
  user {
    id
    displayName
    avatar
  }
  likes {
    id
    userId
  }
  $0
}
`;

const PURE_FIELDS = COMMENT_FIELDS.replace('$0', ``);

const DEPTH = 5;

function getContentString() {
  let content = '';
  const pureComment = COMMENT_FIELDS.replace('$0', ``);
  for (let index = 0; index < DEPTH; index++) {
    if (index === 0) {
      content = pureComment;
    } else {
      content = COMMENT_FIELDS.replace('$0', `replies ${content}`);
    }
  }
  return content;
}

export function getQueryCommentTreeDoc(): DocumentNode {
  return gql(`
  query commentTree($pageId: uuid!) {
    comments(where: { pageId: { _eq: $pageId }, parentId: { _is_null: true } })
    ${getContentString()}
  }`);
}

export function getSubscribeCommentTreeDoc(): DocumentNode {
  return gql(`
  subscription commentTree($pageId: uuid!) {
    comments(where: { pageId: { _eq: $pageId }, parentId: { _is_null: true } })
    ${getContentString()}
  }`);
}

function getParentContentString() {
  let content = '';
  for (let index = 0; index < DEPTH; index++) {
    if (index === 0) {
      content = PURE_FIELDS;
    } else if (index === DEPTH - 1) {
      content = COMMENT_FIELDS.replace(
        '$0',
        `replies ${PURE_FIELDS}
      parent ${content}`,
      );
    } else {
      content = COMMENT_FIELDS.replace('$0', `parent ${content}`);
    }
  }
  return content;
}

export function getQueryCommentDetailsDoc(): DocumentNode {
  return gql(`
  query commentDetails($id: uuid!) {
    commentByPk(id: $id)
      ${getParentContentString()}
  }`);
}

export function getSubscribeCommentDetailsDoc(): DocumentNode {
  return gql(`
  subscription commentDetails($id: uuid!) {
    commentByPk(id: $id)
      ${getParentContentString()}
  }`);
}
