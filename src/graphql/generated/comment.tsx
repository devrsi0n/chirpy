import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CommentTreeQueryVariables = Types.Exact<{
  pageId: Types.Scalars['uuid'];
}>;


export type CommentTreeQuery = (
  { __typename?: 'query_root' }
  & { comments: Array<(
    { __typename?: 'Comment' }
    & Pick<Types.Comment, 'id' | 'content' | 'createdAt' | 'parentId' | 'pageId' | 'depth'>
    & { user: (
      { __typename?: 'User' }
      & Pick<Types.User, 'id' | 'displayName' | 'avatar'>
    ), likes: Array<(
      { __typename?: 'Like' }
      & Pick<Types.Like, 'id' | 'userId'>
    )>, replies: Array<(
      { __typename?: 'Comment' }
      & Pick<Types.Comment, 'id' | 'content' | 'createdAt' | 'parentId' | 'pageId' | 'depth'>
      & { user: (
        { __typename?: 'User' }
        & Pick<Types.User, 'id' | 'displayName' | 'avatar'>
      ), likes: Array<(
        { __typename?: 'Like' }
        & Pick<Types.Like, 'id' | 'userId'>
      )>, replies: Array<(
        { __typename?: 'Comment' }
        & Pick<Types.Comment, 'id' | 'content' | 'createdAt' | 'parentId' | 'pageId' | 'depth'>
        & { user: (
          { __typename?: 'User' }
          & Pick<Types.User, 'id' | 'displayName' | 'avatar'>
        ), likes: Array<(
          { __typename?: 'Like' }
          & Pick<Types.Like, 'id' | 'userId'>
        )> }
      )> }
    )> }
  )> }
);

export type CommentDetailsQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;


export type CommentDetailsQuery = (
  { __typename?: 'query_root' }
  & { commentByPk?: Types.Maybe<(
    { __typename?: 'Comment' }
    & Pick<Types.Comment, 'id' | 'content' | 'createdAt' | 'parentId' | 'pageId' | 'depth'>
    & { user: (
      { __typename: 'User' }
      & Pick<Types.User, 'id' | 'displayName' | 'avatar'>
    ), likes: Array<(
      { __typename: 'Like' }
      & Pick<Types.Like, 'id' | 'userId'>
    )>, replies: Array<(
      { __typename?: 'Comment' }
      & Pick<Types.Comment, 'id' | 'content' | 'createdAt' | 'parentId' | 'pageId' | 'depth'>
      & { user: (
        { __typename?: 'User' }
        & Pick<Types.User, 'id' | 'displayName' | 'avatar'>
      ), likes: Array<(
        { __typename?: 'Like' }
        & Pick<Types.Like, 'id' | 'userId'>
      )> }
    )>, parent?: Types.Maybe<(
      { __typename?: 'Comment' }
      & Pick<Types.Comment, 'id' | 'content' | 'createdAt' | 'parentId' | 'pageId' | 'depth'>
      & { user: (
        { __typename?: 'User' }
        & Pick<Types.User, 'id' | 'displayName' | 'avatar'>
      ), likes: Array<(
        { __typename?: 'Like' }
        & Pick<Types.Like, 'id' | 'userId'>
      )>, parent?: Types.Maybe<(
        { __typename?: 'Comment' }
        & Pick<Types.Comment, 'id' | 'content' | 'createdAt' | 'parentId' | 'pageId' | 'depth'>
        & { user: (
          { __typename?: 'User' }
          & Pick<Types.User, 'id' | 'displayName' | 'avatar'>
        ), likes: Array<(
          { __typename?: 'Like' }
          & Pick<Types.Like, 'id' | 'userId'>
        )>, parent?: Types.Maybe<(
          { __typename?: 'Comment' }
          & Pick<Types.Comment, 'id' | 'content' | 'createdAt' | 'parentId' | 'pageId' | 'depth'>
          & { user: (
            { __typename?: 'User' }
            & Pick<Types.User, 'id' | 'displayName' | 'avatar'>
          ), likes: Array<(
            { __typename?: 'Like' }
            & Pick<Types.Like, 'id' | 'userId'>
          )> }
        )> }
      )> }
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


export const CommentTreeDocument = gql`
    query commentTree($pageId: uuid!) {
  comments(
    where: {pageId: {_eq: $pageId}, parentId: {_is_null: true}}
    order_by: {likes_aggregate: {count: desc}, createdAt: asc}
  ) {
    id
    content
    createdAt
    parentId
    pageId
    depth
    user {
      id
      displayName
      avatar
    }
    likes {
      id
      userId
    }
    replies(order_by: {likes_aggregate: {count: desc}, createdAt: asc}) {
      id
      content
      createdAt
      parentId
      pageId
      depth
      user {
        id
        displayName
        avatar
      }
      likes {
        id
        userId
      }
      replies(order_by: {likes_aggregate: {count: desc}, createdAt: asc}) {
        id
        content
        createdAt
        parentId
        pageId
        depth
        user {
          id
          displayName
          avatar
        }
        likes {
          id
          userId
        }
      }
    }
  }
}
    `;

/**
 * __useCommentTreeQuery__
 *
 * To run a query within a React component, call `useCommentTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentTreeQuery({
 *   variables: {
 *      pageId: // value for 'pageId'
 *   },
 * });
 */
export function useCommentTreeQuery(baseOptions: Apollo.QueryHookOptions<CommentTreeQuery, CommentTreeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentTreeQuery, CommentTreeQueryVariables>(CommentTreeDocument, options);
      }
export function useCommentTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentTreeQuery, CommentTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentTreeQuery, CommentTreeQueryVariables>(CommentTreeDocument, options);
        }
export type CommentTreeQueryHookResult = ReturnType<typeof useCommentTreeQuery>;
export type CommentTreeLazyQueryHookResult = ReturnType<typeof useCommentTreeLazyQuery>;
export type CommentTreeQueryResult = Apollo.QueryResult<CommentTreeQuery, CommentTreeQueryVariables>;
export const CommentDetailsDocument = gql`
    query commentDetails($id: uuid!) {
  commentByPk(id: $id) {
    id
    content
    createdAt
    parentId
    pageId
    depth
    user {
      id
      displayName
      avatar
      __typename
    }
    likes {
      id
      userId
      __typename
    }
    replies(order_by: {likes_aggregate: {count: desc}, createdAt: asc}) {
      id
      content
      createdAt
      parentId
      pageId
      depth
      user {
        id
        displayName
        avatar
      }
      likes {
        id
        userId
      }
    }
    parent {
      id
      content
      createdAt
      parentId
      pageId
      depth
      user {
        id
        displayName
        avatar
      }
      likes {
        id
        userId
      }
      parent {
        id
        content
        createdAt
        parentId
        pageId
        depth
        user {
          id
          displayName
          avatar
        }
        likes {
          id
          userId
        }
        parent {
          id
          content
          createdAt
          parentId
          pageId
          depth
          user {
            id
            displayName
            avatar
          }
          likes {
            id
            userId
          }
        }
      }
    }
  }
}
    `;

/**
 * __useCommentDetailsQuery__
 *
 * To run a query within a React component, call `useCommentDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCommentDetailsQuery(baseOptions: Apollo.QueryHookOptions<CommentDetailsQuery, CommentDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentDetailsQuery, CommentDetailsQueryVariables>(CommentDetailsDocument, options);
      }
export function useCommentDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentDetailsQuery, CommentDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentDetailsQuery, CommentDetailsQueryVariables>(CommentDetailsDocument, options);
        }
export type CommentDetailsQueryHookResult = ReturnType<typeof useCommentDetailsQuery>;
export type CommentDetailsLazyQueryHookResult = ReturnType<typeof useCommentDetailsLazyQuery>;
export type CommentDetailsQueryResult = Apollo.QueryResult<CommentDetailsQuery, CommentDetailsQueryVariables>;
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