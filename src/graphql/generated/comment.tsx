import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type InsertOneCommentMutationVariables = Types.Exact<{
  content: Types.Scalars['jsonb'];
  parentId?: Types.Maybe<Types.Scalars['uuid']>;
  pageId: Types.Scalars['uuid'];
}>;

export type InsertOneCommentMutation = { __typename?: 'mutation_root' } & {
  insertOneComment?: Types.Maybe<
    { __typename?: 'Comment' } & Pick<Types.Comment, 'id' | 'content' | 'createdAt'> & {
        user: { __typename?: 'User' } & Pick<
          Types.User,
          'id' | 'displayName' | 'username' | 'avatar'
        >;
        likes: Array<{ __typename?: 'Like' } & Pick<Types.Like, 'id' | 'userId'>>;
      }
  >;
};

export const InsertOneCommentDocument = gql`
  mutation insertOneComment($content: jsonb!, $parentId: uuid, $pageId: uuid!) {
    insertOneComment(object: { content: $content, parentId: $parentId, pageId: $pageId }) {
      id
      content
      createdAt
      user {
        id
        displayName
        username
        avatar
      }
      likes {
        id
        userId
      }
    }
  }
`;
export type InsertOneCommentMutationFn = Apollo.MutationFunction<
  InsertOneCommentMutation,
  InsertOneCommentMutationVariables
>;

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
 *   },
 * });
 */
export function useInsertOneCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InsertOneCommentMutation,
    InsertOneCommentMutationVariables
  >,
) {
  return Apollo.useMutation<InsertOneCommentMutation, InsertOneCommentMutationVariables>(
    InsertOneCommentDocument,
    baseOptions,
  );
}
export type InsertOneCommentMutationHookResult = ReturnType<typeof useInsertOneCommentMutation>;
export type InsertOneCommentMutationResult = Apollo.MutationResult<InsertOneCommentMutation>;
export type InsertOneCommentMutationOptions = Apollo.BaseMutationOptions<
  InsertOneCommentMutation,
  InsertOneCommentMutationVariables
>;
