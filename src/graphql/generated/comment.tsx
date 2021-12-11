import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CommentContentFragment = { __typename?: 'Comment', id: string, content: any, createdAt: string, deletedAt?: string | null | undefined, parentId?: string | null | undefined, pageId: string, depth: number, user: { __typename?: 'User', id: number, name?: string | null | undefined, avatar?: string | null | undefined }, likes: Array<{ __typename?: 'Like', id: string, userId: number }> };

export type CommentTreeSubscriptionVariables = Types.Exact<{
  pageURL: Types.Scalars['String'];
}>;


export type CommentTreeSubscription = { __typename?: 'subscription_root', comments: Array<{ __typename?: 'Comment', id: string, content: any, createdAt: string, deletedAt?: string | null | undefined, parentId?: string | null | undefined, pageId: string, depth: number, replies: Array<{ __typename?: 'Comment', id: string, content: any, createdAt: string, deletedAt?: string | null | undefined, parentId?: string | null | undefined, pageId: string, depth: number, replies: Array<{ __typename?: 'Comment', id: string, content: any, createdAt: string, deletedAt?: string | null | undefined, parentId?: string | null | undefined, pageId: string, depth: number, user: { __typename?: 'User', id: number, name?: string | null | undefined, avatar?: string | null | undefined }, likes: Array<{ __typename?: 'Like', id: string, userId: number }> }>, user: { __typename?: 'User', id: number, name?: string | null | undefined, avatar?: string | null | undefined }, likes: Array<{ __typename?: 'Like', id: string, userId: number }> }>, user: { __typename?: 'User', id: number, name?: string | null | undefined, avatar?: string | null | undefined }, likes: Array<{ __typename?: 'Like', id: string, userId: number }> }> };

export type CommentDetailsSubscriptionVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;


export type CommentDetailsSubscription = { __typename?: 'subscription_root', commentByPk?: { __typename?: 'Comment', id: string, content: any, createdAt: string, deletedAt?: string | null | undefined, parentId?: string | null | undefined, pageId: string, depth: number, replies: Array<{ __typename?: 'Comment', id: string, content: any, createdAt: string, deletedAt?: string | null | undefined, parentId?: string | null | undefined, pageId: string, depth: number, user: { __typename?: 'User', id: number, name?: string | null | undefined, avatar?: string | null | undefined }, likes: Array<{ __typename?: 'Like', id: string, userId: number }> }>, parent?: { __typename?: 'Comment', id: string, content: any, createdAt: string, deletedAt?: string | null | undefined, parentId?: string | null | undefined, pageId: string, depth: number, parent?: { __typename?: 'Comment', id: string, content: any, createdAt: string, deletedAt?: string | null | undefined, parentId?: string | null | undefined, pageId: string, depth: number, parent?: { __typename?: 'Comment', id: string, content: any, createdAt: string, deletedAt?: string | null | undefined, parentId?: string | null | undefined, pageId: string, depth: number, user: { __typename?: 'User', id: number, name?: string | null | undefined, avatar?: string | null | undefined }, likes: Array<{ __typename?: 'Like', id: string, userId: number }> } | null | undefined, user: { __typename?: 'User', id: number, name?: string | null | undefined, avatar?: string | null | undefined }, likes: Array<{ __typename?: 'Like', id: string, userId: number }> } | null | undefined, user: { __typename?: 'User', id: number, name?: string | null | undefined, avatar?: string | null | undefined }, likes: Array<{ __typename?: 'Like', id: string, userId: number }> } | null | undefined, user: { __typename?: 'User', id: number, name?: string | null | undefined, avatar?: string | null | undefined }, likes: Array<{ __typename?: 'Like', id: string, userId: number }> } | null | undefined };

export type InsertOneCommentMutationVariables = Types.Exact<{
  content: Types.Scalars['jsonb'];
  parentId?: Types.InputMaybe<Types.Scalars['uuid']>;
  pageId: Types.Scalars['uuid'];
  depth: Types.Scalars['Int'];
}>;


export type InsertOneCommentMutation = { __typename?: 'mutation_root', insertOneComment?: { __typename?: 'Comment', id: string } | null | undefined };

export type DeleteOneCommentMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;


export type DeleteOneCommentMutation = { __typename?: 'mutation_root', updateCommentByPk?: { __typename?: 'Comment', id: string } | null | undefined };

export const CommentContentFragmentDoc = gql`
    fragment commentContent on Comment {
  id
  content
  createdAt
  deletedAt
  parentId
  pageId
  depth
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
    where: {page: {url: {_eq: $pageURL}}, parentId: {_is_null: true}}
    order_by: {likes_aggregate: {count: desc}, createdAt: asc}
  ) {
    ...commentContent
    replies(order_by: {likes_aggregate: {count: desc}, createdAt: asc}) {
      ...commentContent
      replies(order_by: {likes_aggregate: {count: desc}, createdAt: asc}) {
        ...commentContent
      }
    }
  }
}
    ${CommentContentFragmentDoc}`;

/**
 * __useCommentTreeSubscription__
 *
 * To run a query within a React component, call `useCommentTreeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCommentTreeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentTreeSubscription({
 *   variables: {
 *      pageURL: // value for 'pageURL'
 *   },
 * });
 */
export function useCommentTreeSubscription(baseOptions: Apollo.SubscriptionHookOptions<CommentTreeSubscription, CommentTreeSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CommentTreeSubscription, CommentTreeSubscriptionVariables>(CommentTreeDocument, options);
      }
export type CommentTreeSubscriptionHookResult = ReturnType<typeof useCommentTreeSubscription>;
export type CommentTreeSubscriptionResult = Apollo.SubscriptionResult<CommentTreeSubscription>;
export const CommentDetailsDocument = gql`
    subscription commentDetails($id: uuid!) {
  commentByPk(id: $id) {
    ...commentContent
    replies(order_by: {likes_aggregate: {count: desc}, createdAt: asc}) {
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
    ${CommentContentFragmentDoc}`;

/**
 * __useCommentDetailsSubscription__
 *
 * To run a query within a React component, call `useCommentDetailsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCommentDetailsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentDetailsSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCommentDetailsSubscription(baseOptions: Apollo.SubscriptionHookOptions<CommentDetailsSubscription, CommentDetailsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CommentDetailsSubscription, CommentDetailsSubscriptionVariables>(CommentDetailsDocument, options);
      }
export type CommentDetailsSubscriptionHookResult = ReturnType<typeof useCommentDetailsSubscription>;
export type CommentDetailsSubscriptionResult = Apollo.SubscriptionResult<CommentDetailsSubscription>;
export const InsertOneCommentDocument = gql`
    mutation insertOneComment($content: jsonb!, $parentId: uuid, $pageId: uuid!, $depth: Int!) {
  insertOneComment(
    object: {content: $content, parentId: $parentId, pageId: $pageId, depth: $depth}
  ) {
    id
  }
}
    `;
export type InsertOneCommentMutationFn = Apollo.MutationFunction<InsertOneCommentMutation, InsertOneCommentMutationVariables>;

/**
 * __useInsertOneCommentMutation__
 *
 * To run a mutation, you first call `useInsertOneCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertOneCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertOneCommentMutation, { data, loading, error }] = useInsertOneCommentMutation({
 *   variables: {
 *      content: // value for 'content'
 *      parentId: // value for 'parentId'
 *      pageId: // value for 'pageId'
 *      depth: // value for 'depth'
 *   },
 * });
 */
export function useInsertOneCommentMutation(baseOptions?: Apollo.MutationHookOptions<InsertOneCommentMutation, InsertOneCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertOneCommentMutation, InsertOneCommentMutationVariables>(InsertOneCommentDocument, options);
      }
export type InsertOneCommentMutationHookResult = ReturnType<typeof useInsertOneCommentMutation>;
export type InsertOneCommentMutationResult = Apollo.MutationResult<InsertOneCommentMutation>;
export type InsertOneCommentMutationOptions = Apollo.BaseMutationOptions<InsertOneCommentMutation, InsertOneCommentMutationVariables>;
export const DeleteOneCommentDocument = gql`
    mutation deleteOneComment($id: uuid!) {
  updateCommentByPk(pk_columns: {id: $id}, _set: {deletedAt: "now()"}) {
    id
  }
}
    `;
export type DeleteOneCommentMutationFn = Apollo.MutationFunction<DeleteOneCommentMutation, DeleteOneCommentMutationVariables>;

/**
 * __useDeleteOneCommentMutation__
 *
 * To run a mutation, you first call `useDeleteOneCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOneCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOneCommentMutation, { data, loading, error }] = useDeleteOneCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteOneCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOneCommentMutation, DeleteOneCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOneCommentMutation, DeleteOneCommentMutationVariables>(DeleteOneCommentDocument, options);
      }
export type DeleteOneCommentMutationHookResult = ReturnType<typeof useDeleteOneCommentMutation>;
export type DeleteOneCommentMutationResult = Apollo.MutationResult<DeleteOneCommentMutation>;
export type DeleteOneCommentMutationOptions = Apollo.BaseMutationOptions<DeleteOneCommentMutation, DeleteOneCommentMutationVariables>;