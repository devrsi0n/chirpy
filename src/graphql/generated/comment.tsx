import gql from 'graphql-tag';
import * as Urql from 'urql';

import * as Types from './types';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CommentContentFragment = {
  __typename?: 'Comment';
  id: string;
  content: any;
  createdAt: string;
  deletedAt?: string | null;
  parentId?: string | null;
  pageId: string;
  user: { __typename?: 'User'; id: string; name?: string | null; avatar?: string | null };
  likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
};

export type CommentTreeSubscriptionVariables = Types.Exact<{
  pageURL: Types.Scalars['String'];
}>;

export type CommentTreeSubscription = {
  __typename?: 'subscription_root';
  comments: Array<{
    __typename?: 'Comment';
    id: string;
    content: any;
    createdAt: string;
    deletedAt?: string | null;
    parentId?: string | null;
    pageId: string;
    replies: Array<{
      __typename?: 'Comment';
      id: string;
      content: any;
      createdAt: string;
      deletedAt?: string | null;
      parentId?: string | null;
      pageId: string;
      replies: Array<{
        __typename?: 'Comment';
        id: string;
        content: any;
        createdAt: string;
        deletedAt?: string | null;
        parentId?: string | null;
        pageId: string;
        user: { __typename?: 'User'; id: string; name?: string | null; avatar?: string | null };
        likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
      }>;
      user: { __typename?: 'User'; id: string; name?: string | null; avatar?: string | null };
      likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
    }>;
    user: { __typename?: 'User'; id: string; name?: string | null; avatar?: string | null };
    likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
  }>;
};

export type CommentDetailsSubscriptionVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;

export type CommentDetailsSubscription = {
  __typename?: 'subscription_root';
  commentByPk?: {
    __typename?: 'Comment';
    id: string;
    content: any;
    createdAt: string;
    deletedAt?: string | null;
    parentId?: string | null;
    pageId: string;
    replies: Array<{
      __typename?: 'Comment';
      id: string;
      content: any;
      createdAt: string;
      deletedAt?: string | null;
      parentId?: string | null;
      pageId: string;
      user: { __typename?: 'User'; id: string; name?: string | null; avatar?: string | null };
      likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
    }>;
    parent?: {
      __typename?: 'Comment';
      id: string;
      content: any;
      createdAt: string;
      deletedAt?: string | null;
      parentId?: string | null;
      pageId: string;
      parent?: {
        __typename?: 'Comment';
        id: string;
        content: any;
        createdAt: string;
        deletedAt?: string | null;
        parentId?: string | null;
        pageId: string;
        parent?: {
          __typename?: 'Comment';
          id: string;
          content: any;
          createdAt: string;
          deletedAt?: string | null;
          parentId?: string | null;
          pageId: string;
          user: { __typename?: 'User'; id: string; name?: string | null; avatar?: string | null };
          likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
        } | null;
        user: { __typename?: 'User'; id: string; name?: string | null; avatar?: string | null };
        likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
      } | null;
      user: { __typename?: 'User'; id: string; name?: string | null; avatar?: string | null };
      likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
    } | null;
    user: { __typename?: 'User'; id: string; name?: string | null; avatar?: string | null };
    likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
  } | null;
};

export type InsertOneCommentMutationVariables = Types.Exact<{
  content: Types.Scalars['jsonb'];
  parentId?: Types.InputMaybe<Types.Scalars['uuid']>;
  pageId: Types.Scalars['uuid'];
}>;

export type InsertOneCommentMutation = {
  __typename?: 'mutation_root';
  insertOneComment?: { __typename?: 'Comment'; id: string } | null;
};

export type DeleteOneCommentMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;

export type DeleteOneCommentMutation = {
  __typename?: 'mutation_root';
  updateCommentByPk?: { __typename?: 'Comment'; id: string } | null;
};

export type CommentOfPageQueryVariables = Types.Exact<{
  pageId?: Types.InputMaybe<Types.Scalars['uuid']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type CommentOfPageQuery = {
  __typename?: 'query_root';
  comments: Array<{
    __typename?: 'Comment';
    id: string;
    content: any;
    createdAt: string;
    deletedAt?: string | null;
    parentId?: string | null;
    pageId: string;
    comment: any;
    replies: Array<{
      __typename?: 'Comment';
      id: string;
      content: any;
      createdAt: string;
      deletedAt?: string | null;
      parentId?: string | null;
      pageId: string;
      comment: any;
      replies: Array<{
        __typename?: 'Comment';
        id: string;
        content: any;
        createdAt: string;
        deletedAt?: string | null;
        parentId?: string | null;
        pageId: string;
        comment: any;
        user: { __typename?: 'User'; id: string; name?: string | null; avatar?: string | null };
        likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
      }>;
      user: { __typename?: 'User'; id: string; name?: string | null; avatar?: string | null };
      likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
    }>;
    user: { __typename?: 'User'; id: string; name?: string | null; avatar?: string | null };
    likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
  }>;
};

export type DeleteCommentByPkMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;

export type DeleteCommentByPkMutation = {
  __typename?: 'mutation_root';
  deleteCommentByPk?: { __typename?: 'Comment'; id: string } | null;
};

export const CommentContentFragmentDoc = gql`
  fragment commentContent on Comment {
    id
    content
    createdAt
    deletedAt
    parentId
    pageId
    user {
      id
      name
      avatar
    }
    likes {
      id
      userId
    }
  }
`;
export const CommentTreeDocument = gql`
  subscription commentTree($pageURL: String!) {
    comments(
      where: { page: { url: { _eq: $pageURL } }, parentId: { _is_null: true } }
      order_by: { likes_aggregate: { count: desc }, createdAt: asc }
    ) {
      ...commentContent
      replies(order_by: { likes_aggregate: { count: desc }, createdAt: asc }) {
        ...commentContent
        replies(order_by: { likes_aggregate: { count: desc }, createdAt: asc }) {
          ...commentContent
        }
      }
    }
  }
  ${CommentContentFragmentDoc}
`;

export function useCommentTreeSubscription<TData = CommentTreeSubscription>(
  options: Omit<Urql.UseSubscriptionArgs<CommentTreeSubscriptionVariables>, 'query'> = {},
  handler?: Urql.SubscriptionHandler<CommentTreeSubscription, TData>,
) {
  return Urql.useSubscription<CommentTreeSubscription, TData, CommentTreeSubscriptionVariables>(
    { query: CommentTreeDocument, ...options },
    handler,
  );
}
export const CommentDetailsDocument = gql`
  subscription commentDetails($id: uuid!) {
    commentByPk(id: $id) {
      ...commentContent
      replies(order_by: { likes_aggregate: { count: desc }, createdAt: asc }) {
        ...commentContent
      }
      parent {
        ...commentContent
        parent {
          ...commentContent
          parent {
            ...commentContent
          }
        }
      }
    }
  }
  ${CommentContentFragmentDoc}
`;

export function useCommentDetailsSubscription<TData = CommentDetailsSubscription>(
  options: Omit<Urql.UseSubscriptionArgs<CommentDetailsSubscriptionVariables>, 'query'> = {},
  handler?: Urql.SubscriptionHandler<CommentDetailsSubscription, TData>,
) {
  return Urql.useSubscription<
    CommentDetailsSubscription,
    TData,
    CommentDetailsSubscriptionVariables
  >({ query: CommentDetailsDocument, ...options }, handler);
}
export const InsertOneCommentDocument = gql`
  mutation insertOneComment($content: jsonb!, $parentId: uuid, $pageId: uuid!) {
    insertOneComment(object: { content: $content, parentId: $parentId, pageId: $pageId }) {
      id
    }
  }
`;

export function useInsertOneCommentMutation() {
  return Urql.useMutation<InsertOneCommentMutation, InsertOneCommentMutationVariables>(
    InsertOneCommentDocument,
  );
}
export const DeleteOneCommentDocument = gql`
  mutation deleteOneComment($id: uuid!) {
    updateCommentByPk(pk_columns: { id: $id }, _set: { deletedAt: "now()" }) {
      id
    }
  }
`;

export function useDeleteOneCommentMutation() {
  return Urql.useMutation<DeleteOneCommentMutation, DeleteOneCommentMutationVariables>(
    DeleteOneCommentDocument,
  );
}
export const CommentOfPageDocument = gql`
  query commentOfPage($pageId: uuid, $limit: Int, $offset: Int) {
    comments(where: { pageId: { _eq: $pageId } }, limit: $limit, offset: $offset) {
      comment: content(path: "content")
      ...commentContent
      replies(order_by: { likes_aggregate: { count: desc }, createdAt: asc }) {
        comment: content(path: "content")
        ...commentContent
        replies(order_by: { likes_aggregate: { count: desc }, createdAt: asc }) {
          comment: content(path: "content")
          ...commentContent
        }
      }
    }
  }
  ${CommentContentFragmentDoc}
`;

export function useCommentOfPageQuery(
  options?: Omit<Urql.UseQueryArgs<CommentOfPageQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CommentOfPageQuery>({ query: CommentOfPageDocument, ...options });
}
export const DeleteCommentByPkDocument = gql`
  mutation deleteCommentByPk($id: uuid!) {
    deleteCommentByPk(id: $id) {
      id
    }
  }
`;

export function useDeleteCommentByPkMutation() {
  return Urql.useMutation<DeleteCommentByPkMutation, DeleteCommentByPkMutationVariables>(
    DeleteCommentByPkDocument,
  );
}
