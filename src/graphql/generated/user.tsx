import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UserByPkQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;


export type UserByPkQuery = (
  { __typename?: 'query_root' }
  & { userByPk?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'email' | 'username' | 'displayName' | 'givenName' | 'middleName' | 'familyName' | 'avatar' | 'bio' | 'website' | 'twitterUserName'>
    & { members: Array<(
      { __typename?: 'Member' }
      & Pick<Types.Member, 'id' | 'role' | 'teamId'>
      & { team: (
        { __typename?: 'Team' }
        & Pick<Types.Team, 'id' | 'name' | 'uid'>
      ) }
    )>, projects: Array<(
      { __typename?: 'Project' }
      & Pick<Types.Project, 'id' | 'name' | 'createdAt'>
      & { pages: Array<(
        { __typename?: 'Page' }
        & Pick<Types.Page, 'id' | 'title' | 'url'>
      )> }
    )> }
  )> }
);

export type UpdateUserByPkMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
  bio?: Types.Maybe<Types.Scalars['String']>;
  displayName: Types.Scalars['String'];
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


export const UserByPkDocument = gql`
    query userByPk($id: uuid!) {
  userByPk(id: $id) {
    id
    email
    username
    displayName
    givenName
    middleName
    familyName
    avatar
    bio
    website
    twitterUserName
    members {
      id
      role
      teamId
      team {
        id
        name
        uid
      }
    }
    projects {
      id
      name
      pages {
        id
        title
        url
      }
      createdAt
    }
  }
}
    `;

/**
 * __useUserByPkQuery__
 *
 * To run a query within a React component, call `useUserByPkQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByPkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByPkQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserByPkQuery(baseOptions: Apollo.QueryHookOptions<UserByPkQuery, UserByPkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserByPkQuery, UserByPkQueryVariables>(UserByPkDocument, options);
      }
export function useUserByPkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByPkQuery, UserByPkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserByPkQuery, UserByPkQueryVariables>(UserByPkDocument, options);
        }
export type UserByPkQueryHookResult = ReturnType<typeof useUserByPkQuery>;
export type UserByPkLazyQueryHookResult = ReturnType<typeof useUserByPkLazyQuery>;
export type UserByPkQueryResult = Apollo.QueryResult<UserByPkQuery, UserByPkQueryVariables>;
export const UpdateUserByPkDocument = gql`
    mutation updateUserByPk($id: uuid!, $bio: String, $displayName: String!, $twitterUserName: String, $website: String) {
  updateUserByPk(
    pk_columns: {id: $id}
    _set: {bio: $bio, displayName: $displayName, twitterUserName: $twitterUserName, website: $website}
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
 *      displayName: // value for 'displayName'
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