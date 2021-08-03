import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CommentContentFragment = (
  { __typename?: 'Comment' }
  & Pick<Types.Comment, 'id' | 'content' | 'createdAt' | 'parentId' | 'pageId' | 'depth'>
  & { user: (
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name' | 'avatar'>
  ), likes: Array<(
    { __typename?: 'Like' }
    & Pick<Types.Like, 'id' | 'userId'>
  )> }
);

export type CommentTreeSubscriptionVariables = Types.Exact<{
  pageId: Types.Scalars['uuid'];
}>;


export type CommentTreeSubscription = (
  { __typename?: 'subscription_root' }
  & { comments: Array<(
    { __typename?: 'Comment' }
    & Pick<Types.Comment, 'id' | 'content' | 'createdAt' | 'parentId' | 'pageId' | 'depth'>
    & { replies: Array<(
      { __typename?: 'Comment' }
      & Pick<Types.Comment, 'id' | 'content' | 'createdAt' | 'parentId' | 'pageId' | 'depth'>
      & { replies: Array<(
        { __typename?: 'Comment' }
        & Pick<Types.Comment, 'id' | 'content' | 'createdAt' | 'parentId' | 'pageId' | 'depth'>
        & { user: (
          { __typename?: 'User' }
          & Pick<Types.User, 'id' | 'name' | 'avatar'>
        ), likes: Array<(
          { __typename?: 'Like' }
          & Pick<Types.Like, 'id' | 'userId'>
        )> }
      )>, user: (
        { __typename?: 'User' }
        & Pick<Types.User, 'id' | 'name' | 'avatar'>
      ), likes: Array<(
        { __typename?: 'Like' }
        & Pick<Types.Like, 'id' | 'userId'>
      )> }
    )>, user: (
      { __typename?: 'User' }
      & Pick<Types.User, 'id' | 'name' | 'avatar'>
    ), likes: Array<(
      { __typename?: 'Like' }
      & Pick<Types.Like, 'id' | 'userId'>
    )> }
  )> }
);

export type CommentDetailsSubscriptionVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;


export type CommentDetailsSubscription = (
  { __typename?: 'subscription_root' }
  & { commentByPk?: Types.Maybe<(
    { __typename?: 'Comment' }
    & Pick<Types.Comment, 'id' | 'content' | 'createdAt' | 'parentId' | 'pageId' | 'depth'>
    & { replies: Array<(
      { __typename?: 'Comment' }
      & Pick<Types.Comment, 'id' | 'content' | 'createdAt' | 'parentId' | 'pageId' | 'depth'>
      & { user: (
        { __typename?: 'User' }
        & Pick<Types.User, 'id' | 'name' | 'avatar'>
      ), likes: Array<(
        { __typename?: 'Like' }
        & Pick<Types.Like, 'id' | 'userId'>
      )> }
    )>, parent?: Types.Maybe<(
      { __typename?: 'Comment' }
      & Pick<Types.Comment, 'id' | 'content' | 'createdAt' | 'parentId' | 'pageId' | 'depth'>
      & { parent?: Types.Maybe<(
        { __typename?: 'Comment' }
        & Pick<Types.Comment, 'id' | 'content' | 'createdAt' | 'parentId' | 'pageId' | 'depth'>
        & { parent?: Types.Maybe<(
          { __typename?: 'Comment' }
          & Pick<Types.Comment, 'id' | 'content' | 'createdAt' | 'parentId' | 'pageId' | 'depth'>
          & { user: (
            { __typename?: 'User' }
            & Pick<Types.User, 'id' | 'name' | 'avatar'>
          ), likes: Array<(
            { __typename?: 'Like' }
            & Pick<Types.Like, 'id' | 'userId'>
          )> }
        )>, user: (
          { __typename?: 'User' }
          & Pick<Types.User, 'id' | 'name' | 'avatar'>
        ), likes: Array<(
          { __typename?: 'Like' }
          & Pick<Types.Like, 'id' | 'userId'>
        )> }
      )>, user: (
        { __typename?: 'User' }
        & Pick<Types.User, 'id' | 'name' | 'avatar'>
      ), likes: Array<(
        { __typename?: 'Like' }
        & Pick<Types.Like, 'id' | 'userId'>
      )> }
    )>, user: (
      { __typename?: 'User' }
      & Pick<Types.User, 'id' | 'name' | 'avatar'>
    ), likes: Array<(
      { __typename?: 'Like' }
      & Pick<Types.Like, 'id' | 'userId'>
    )> }
  )> }
);

export type InsertOneCommentMutationVariables = Types.Exact<{
  content: Types.Scalars['jsonb'];
  parentId?: Types.Maybe<Types.Scalars['uuid']>;
  pageId: Types.Scalars['uuid'];
  depth: Types.Scalars['Int'];
}>;


export type InsertOneCommentMutation = (
  { __typename?: 'mutation_root' }
  & { insertOneComment?: Types.Maybe<(
    { __typename?: 'Comment' }
    & Pick<Types.Comment, 'id'>
  )> }
);

export const CommentContentFragmentDoc = gql`
    fragment commentContent on Comment {
  id
  content
  createdAt
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
    subscription commentTree($pageId: uuid!) {
  comments(
    where: {pageId: {_eq: $pageId}, parentId: {_is_null: true}}
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
 *      pageId: // value for 'pageId'
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