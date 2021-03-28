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

// HASURA engine limit to maximum depth 4.
// TODO: Test it with hasura 2.0
const DEPTH = 4;
const COMMENT_TREE_WHERE = 'where: { pageId: { _eq: $pageId }, parentId: { _is_null: true } }';
const ORDER_BY = `order_by: { likes_aggregate: { count: desc }, createdAt: asc }`;

function getContentString() {
  let content = '';
  const pureComment = COMMENT_FIELDS.replace('$0', ``);
  for (let index = 0; index < DEPTH; index++) {
    if (index === 0) {
      content = pureComment;
    } else {
      content = COMMENT_FIELDS.replace('$0', `replies(${ORDER_BY}) ${content}`);
    }
  }
  return content;
}

export function getQueryCommentTreeDoc(): DocumentNode {
  return gql(`
  query commentTree($pageId: uuid!) {
    comments(
      ${COMMENT_TREE_WHERE}
      ${ORDER_BY}
    )
    ${getContentString()}
  }`);
}

export function getSubscribeCommentTreeDoc(): DocumentNode {
  return gql(`
  subscription commentTree($pageId: uuid!) {
    comments(
      ${COMMENT_TREE_WHERE}
      ${ORDER_BY}
    )
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
        `replies(${ORDER_BY}) ${PURE_FIELDS}
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
