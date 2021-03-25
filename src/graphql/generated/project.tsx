import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type InsertOneProjectMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
  teamId?: Types.Maybe<Types.Scalars['uuid']>;
  userId?: Types.Maybe<Types.Scalars['uuid']>;
}>;


export type InsertOneProjectMutation = (
  { __typename?: 'mutation_root' }
  & { insertOneProject?: Types.Maybe<(
    { __typename?: 'Project' }
    & Pick<Types.Project, 'id' | 'name' | 'teamId' | 'userId'>
  )> }
);


export const InsertOneProjectDocument = gql`
    mutation insertOneProject($name: String!, $teamId: uuid, $userId: uuid) {
  insertOneProject(object: {teamId: $teamId, name: $name, userId: $userId}) {
    id
    name
    teamId
    userId
  }
}
    `;
export type InsertOneProjectMutationFn = Apollo.MutationFunction<InsertOneProjectMutation, InsertOneProjectMutationVariables>;

/**
 * __useInsertOneProjectMutation__
 *
 * To run a mutation, you first call `useInsertOneProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertOneProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertOneProjectMutation, { data, loading, error }] = useInsertOneProjectMutation({
 *   variables: {
 *      name: // value for 'name'
 *      teamId: // value for 'teamId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useInsertOneProjectMutation(baseOptions?: Apollo.MutationHookOptions<InsertOneProjectMutation, InsertOneProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertOneProjectMutation, InsertOneProjectMutationVariables>(InsertOneProjectDocument, options);
      }
export type InsertOneProjectMutationHookResult = ReturnType<typeof useInsertOneProjectMutation>;
export type InsertOneProjectMutationResult = Apollo.MutationResult<InsertOneProjectMutation>;
export type InsertOneProjectMutationOptions = Apollo.BaseMutationOptions<InsertOneProjectMutation, InsertOneProjectMutationVariables>;