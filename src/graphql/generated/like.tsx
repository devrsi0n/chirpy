import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type CreateOneLikeMutationVariables = Types.Exact<{
  userId: Types.Scalars['String'];
  commentId: Types.Scalars['String'];
}>;

export type CreateOneLikeMutation = { __typename?: 'Mutation' } & {
  createOneLike: { __typename?: 'Like' } & Pick<Types.Like, 'id'> & {
      user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'name' | 'avatar'>;
    };
};

export type DeleteOneLikeMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type DeleteOneLikeMutation = { __typename?: 'Mutation' } & {
  deleteOneLike?: Types.Maybe<{ __typename?: 'Like' } & Pick<Types.Like, 'id'>>;
};

export const CreateOneLikeDocument = gql`
  mutation createOneLike($userId: String!, $commentId: String!) {
    createOneLike(
      data: { comment: { connect: { id: $commentId } }, user: { connect: { id: $userId } } }
    ) {
      id
      user {
        id
        name
        avatar
      }
    }
  }
`;
export type CreateOneLikeMutationFn = Apollo.MutationFunction<
  CreateOneLikeMutation,
  CreateOneLikeMutationVariables
>;

/**
 * __useCreateOneLikeMutation__
 *
 * To run a mutation, you first call `useCreateOneLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOneLikeMutation, { data, loading, error }] = useCreateOneLikeMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useCreateOneLikeMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateOneLikeMutation, CreateOneLikeMutationVariables>,
) {
  return Apollo.useMutation<CreateOneLikeMutation, CreateOneLikeMutationVariables>(
    CreateOneLikeDocument,
    baseOptions,
  );
}
export type CreateOneLikeMutationHookResult = ReturnType<typeof useCreateOneLikeMutation>;
export type CreateOneLikeMutationResult = Apollo.MutationResult<CreateOneLikeMutation>;
export type CreateOneLikeMutationOptions = Apollo.BaseMutationOptions<
  CreateOneLikeMutation,
  CreateOneLikeMutationVariables
>;
export const DeleteOneLikeDocument = gql`
  mutation deleteOneLike($id: String!) {
    deleteOneLike(where: { id: $id }) {
      id
    }
  }
`;
export type DeleteOneLikeMutationFn = Apollo.MutationFunction<
  DeleteOneLikeMutation,
  DeleteOneLikeMutationVariables
>;

/**
 * __useDeleteOneLikeMutation__
 *
 * To run a mutation, you first call `useDeleteOneLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOneLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOneLikeMutation, { data, loading, error }] = useDeleteOneLikeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteOneLikeMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteOneLikeMutation, DeleteOneLikeMutationVariables>,
) {
  return Apollo.useMutation<DeleteOneLikeMutation, DeleteOneLikeMutationVariables>(
    DeleteOneLikeDocument,
    baseOptions,
  );
}
export type DeleteOneLikeMutationHookResult = ReturnType<typeof useDeleteOneLikeMutation>;
export type DeleteOneLikeMutationResult = Apollo.MutationResult<DeleteOneLikeMutation>;
export type DeleteOneLikeMutationOptions = Apollo.BaseMutationOptions<
  DeleteOneLikeMutation,
  DeleteOneLikeMutationVariables
>;
