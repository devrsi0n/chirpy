import gql from 'graphql-tag';
import * as Urql from 'urql';

import * as Types from './types';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CommentItemFragment = {
  __typename?: 'Comment';
  id: string;
  content: any;
  createdAt: string;
  deletedAt?: string | null;
  parentId?: string | null;
  pageId: string;
  user: {
    __typename?: 'User';
    id: string;
    name?: string | null;
    username?: string | null;
    email?: string | null;
    avatar?: string | null;
  };
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
        replies: Array<{
          __typename?: 'Comment';
          id: string;
          content: any;
          createdAt: string;
          deletedAt?: string | null;
          parentId?: string | null;
          pageId: string;
          user: {
            __typename?: 'User';
            id: string;
            name?: string | null;
            username?: string | null;
            email?: string | null;
            avatar?: string | null;
          };
          likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
        }>;
        user: {
          __typename?: 'User';
          id: string;
          name?: string | null;
          username?: string | null;
          email?: string | null;
          avatar?: string | null;
        };
        likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
      }>;
      user: {
        __typename?: 'User';
        id: string;
        name?: string | null;
        username?: string | null;
        email?: string | null;
        avatar?: string | null;
      };
      likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
    }>;
    user: {
      __typename?: 'User';
      id: string;
      name?: string | null;
      username?: string | null;
      email?: string | null;
      avatar?: string | null;
    };
    likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
  }>;
};

export type CommentTimelineSubscriptionVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;

export type CommentTimelineSubscription = {
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
      user: {
        __typename?: 'User';
        id: string;
        name?: string | null;
        username?: string | null;
        email?: string | null;
        avatar?: string | null;
      };
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
          user: {
            __typename?: 'User';
            id: string;
            name?: string | null;
            username?: string | null;
            email?: string | null;
            avatar?: string | null;
          };
          likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
        } | null;
        user: {
          __typename?: 'User';
          id: string;
          name?: string | null;
          username?: string | null;
          email?: string | null;
          avatar?: string | null;
        };
        likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
      } | null;
      user: {
        __typename?: 'User';
        id: string;
        name?: string | null;
        username?: string | null;
        email?: string | null;
        avatar?: string | null;
      };
      likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
    } | null;
    user: {
      __typename?: 'User';
      id: string;
      name?: string | null;
      username?: string | null;
      email?: string | null;
      avatar?: string | null;
    };
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

export const CommentItemFragmentDoc = gql`
  fragment commentItem on Comment {
    id
    content
    createdAt
    deletedAt
    parentId
    pageId
    user {
      id
      name
      username
      email
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
      ...commentItem
      replies(order_by: { likes_aggregate: { count: desc }, createdAt: asc }) {
        ...commentItem
        replies(
          order_by: { likes_aggregate: { count: desc }, createdAt: asc }
        ) {
          ...commentItem
          replies(
            order_by: { likes_aggregate: { count: desc }, createdAt: asc }
          ) {
            ...commentItem
          }
        }
      }
    }
  }
  ${CommentItemFragmentDoc}
`;

export function useCommentTreeSubscription<TData = CommentTreeSubscription>(
  options: Omit<
    Urql.UseSubscriptionArgs<CommentTreeSubscriptionVariables>,
    'query'
  > = {},
  handler?: Urql.SubscriptionHandler<CommentTreeSubscription, TData>,
) {
  return Urql.useSubscription<
    CommentTreeSubscription,
    TData,
    CommentTreeSubscriptionVariables
  >({ query: CommentTreeDocument, ...options }, handler);
}
export const CommentTimelineDocument = gql`
  subscription commentTimeline($id: uuid!) {
    commentByPk(id: $id) {
      ...commentItem
      replies(order_by: { likes_aggregate: { count: desc }, createdAt: asc }) {
        ...commentItem
      }
      parent {
        ...commentItem
        parent {
          ...commentItem
          parent {
            ...commentItem
          }
        }
      }
    }
  }
  ${CommentItemFragmentDoc}
`;

export function useCommentTimelineSubscription<
  TData = CommentTimelineSubscription,
>(
  options: Omit<
    Urql.UseSubscriptionArgs<CommentTimelineSubscriptionVariables>,
    'query'
  > = {},
  handler?: Urql.SubscriptionHandler<CommentTimelineSubscription, TData>,
) {
  return Urql.useSubscription<
    CommentTimelineSubscription,
    TData,
    CommentTimelineSubscriptionVariables
  >({ query: CommentTimelineDocument, ...options }, handler);
}
export const InsertOneCommentDocument = gql`
  mutation insertOneComment($content: jsonb!, $parentId: uuid, $pageId: uuid!) {
    insertOneComment(
      object: { content: $content, parentId: $parentId, pageId: $pageId }
    ) {
      id
    }
  }
`;

export function useInsertOneCommentMutation() {
  return Urql.useMutation<
    InsertOneCommentMutation,
    InsertOneCommentMutationVariables
  >(InsertOneCommentDocument);
}
export const DeleteOneCommentDocument = gql`
  mutation deleteOneComment($id: uuid!) {
    updateCommentByPk(pk_columns: { id: $id }, _set: { deletedAt: "now()" }) {
      id
    }
  }
`;

export function useDeleteOneCommentMutation() {
  return Urql.useMutation<
    DeleteOneCommentMutation,
    DeleteOneCommentMutationVariables
  >(DeleteOneCommentDocument);
}
