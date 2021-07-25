import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CurrentUserQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type CurrentUserQuery = (
  { __typename?: 'query_root' }
  & { userByPk?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'email' | 'username' | 'name' | 'avatar' | 'bio' | 'website' | 'twitterUserName'>
  )> }
);

export type UpdateUserByPkMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
  bio?: Types.Maybe<Types.Scalars['String']>;
  name: Types.Scalars['String'];
  twitterUserName?: Types.Maybe<Types.Scalars['String']>;
  website?: Types.Maybe<Types.Scalars['String']>;
}>;


export type UpdateUserByPkMutation = (
  { __typename?: 'mutation_root' }
  & { updateUserByPk?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id'>
  )> }
);


export const CurrentUserDocument = gql`
    query currentUser($id: Int!) {
  userByPk(id: $id) {
    id
    email
    username
    name
    avatar
    bio
    website
    twitterUserName
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const UpdateUserByPkDocument = gql`
    mutation updateUserByPk($id: Int!, $bio: String, $name: String!, $twitterUserName: String, $website: String) {
  updateUserByPk(
    pk_columns: {id: $id}
    _set: {bio: $bio, name: $name, twitterUserName: $twitterUserName, website: $website}
  ) {
    id
  }
}
    `;
export type UpdateUserByPkMutationFn = Apollo.MutationFunction<UpdateUserByPkMutation, UpdateUserByPkMutationVariables>;

/**
 * __useUpdateUserByPkMutation__
 *
 * To run a mutation, you first call `useUpdateUserByPkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserByPkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserByPkMutation, { data, loading, error }] = useUpdateUserByPkMutation({
 *   variables: {
 *      id: // value for 'id'
 *      bio: // value for 'bio'
 *      name: // value for 'name'
 *      twitterUserName: // value for 'twitterUserName'
 *      website: // value for 'website'
 *   },
 * });
 */
export function useUpdateUserByPkMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserByPkMutation, UpdateUserByPkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserByPkMutation, UpdateUserByPkMutationVariables>(UpdateUserByPkDocument, options);
      }
export type UpdateUserByPkMutationHookResult = ReturnType<typeof useUpdateUserByPkMutation>;
export type UpdateUserByPkMutationResult = Apollo.MutationResult<UpdateUserByPkMutation>;
export type UpdateUserByPkMutationOptions = Apollo.BaseMutationOptions<UpdateUserByPkMutation, UpdateUserByPkMutationVariables>;