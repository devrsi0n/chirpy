import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type InsertOneLikeMutationVariables = Types.Exact<{
  compoundId: Types.Scalars['String'];
  commentId: Types.Scalars['uuid'];
}>;

export type InsertOneLikeMutation = { __typename?: 'mutation_root' } & {
  insertOneLike?: Types.Maybe<
    { __typename?: 'Like' } & Pick<Types.Like, 'id' | 'userId'> & {
        user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'displayName' | 'avatar'>;
      }
  >;
};

export type DeleteLikeByPkMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;

export type DeleteLikeByPkMutation = { __typename?: 'mutation_root' } & {
  deleteLikeByPk?: Types.Maybe<{ __typename?: 'Like' } & Pick<Types.Like, 'id'>>;
};

export const InsertOneLikeDocument = gql`
  mutation insertOneLike($compoundId: String!, $commentId: uuid!) {
    insertOneLike(object: { commentId: $commentId, compoundId: $compoundId }) {
      id
      userId
      user {
        id
        displayName
        avatar
      }
    }
  }
`;
export type InsertOneLikeMutationFn = Apollo.MutationFunction<
  InsertOneLikeMutation,
  InsertOneLikeMutationVariables
>;

/**
 * __useInsertOneLikeMutation__
 *
 * To run a mutation, you first call `useInsertOneLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertOneLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertOneLikeMutation, { data, loading, error }] = useInsertOneLikeMutation({
 *   variables: {
 *      compoundId: // value for 'compoundId'
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useInsertOneLikeMutation(
  baseOptions?: Apollo.MutationHookOptions<InsertOneLikeMutation, InsertOneLikeMutationVariables>,
) {
  return Apollo.useMutation<InsertOneLikeMutation, InsertOneLikeMutationVariables>(
    InsertOneLikeDocument,
    baseOptions,
  );
}
export type InsertOneLikeMutationHookResult = ReturnType<typeof useInsertOneLikeMutation>;
export type InsertOneLikeMutationResult = Apollo.MutationResult<InsertOneLikeMutation>;
export type InsertOneLikeMutationOptions = Apollo.BaseMutationOptions<
  InsertOneLikeMutation,
  InsertOneLikeMutationVariables
>;
export const DeleteLikeByPkDocument = gql`
  mutation deleteLikeByPk($id: uuid!) {
    deleteLikeByPk(id: $id) {
      id
    }
  }
`;
export type DeleteLikeByPkMutationFn = Apollo.MutationFunction<
  DeleteLikeByPkMutation,
  DeleteLikeByPkMutationVariables
>;

/**
 * __useDeleteLikeByPkMutation__
 *
 * To run a mutation, you first call `useDeleteLikeByPkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLikeByPkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLikeByPkMutation, { data, loading, error }] = useDeleteLikeByPkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLikeByPkMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteLikeByPkMutation, DeleteLikeByPkMutationVariables>,
) {
  return Apollo.useMutation<DeleteLikeByPkMutation, DeleteLikeByPkMutationVariables>(
    DeleteLikeByPkDocument,
    baseOptions,
  );
}
export type DeleteLikeByPkMutationHookResult = ReturnType<typeof useDeleteLikeByPkMutation>;
export type DeleteLikeByPkMutationResult = Apollo.MutationResult<DeleteLikeByPkMutation>;
export type DeleteLikeByPkMutationOptions = Apollo.BaseMutationOptions<
  DeleteLikeByPkMutation,
  DeleteLikeByPkMutationVariables
>;
