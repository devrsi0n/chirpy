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

export type UserDashboardProjectsQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
  today: Types.Scalars['timestamptz'];
  yesterday: Types.Scalars['timestamptz'];
  twoDaysAgo: Types.Scalars['timestamptz'];
}>;


export type UserDashboardProjectsQuery = (
  { __typename?: 'query_root' }
  & { userByPk?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id'>
    & { projects: Array<(
      { __typename?: 'Project' }
      & Pick<Types.Project, 'id' | 'name' | 'createdAt'>
      & { pages: Array<(
        { __typename?: 'Page' }
        & Pick<Types.Page, 'id' | 'title' | 'url'>
      )>, sessionsYesterday: Array<(
        { __typename?: 'AnonymousSession' }
        & { events_aggregate: (
          { __typename?: 'Event_aggregate' }
          & { aggregate?: Types.Maybe<(
            { __typename?: 'Event_aggregate_fields' }
            & Pick<Types.Event_Aggregate_Fields, 'count'>
          )>, nodes: Array<(
            { __typename?: 'Event' }
            & Pick<Types.Event, 'created_at'>
          )> }
        ) }
      )>, sessionsTwoDaysAgo: Array<(
        { __typename?: 'AnonymousSession' }
        & { events_aggregate: (
          { __typename?: 'Event_aggregate' }
          & { aggregate?: Types.Maybe<(
            { __typename?: 'Event_aggregate_fields' }
            & Pick<Types.Event_Aggregate_Fields, 'count'>
          )>, nodes: Array<(
            { __typename?: 'Event' }
            & Pick<Types.Event, 'created_at'>
          )> }
        ) }
      )> }
    )> }
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
export const UserDashboardProjectsDocument = gql`
    query userDashboardProjects($id: Int!, $today: timestamptz!, $yesterday: timestamptz!, $twoDaysAgo: timestamptz!) {
  userByPk(id: $id) {
    id
    projects {
      id
      name
      createdAt
      pages {
        id
        title
        url
      }
      sessionsYesterday: anonymousSession {
        events_aggregate(
          where: {type: {_eq: "pageview"}, created_at: {_gte: $yesterday, _lt: $today}}
        ) {
          aggregate {
            count(columns: id)
          }
          nodes {
            created_at
          }
        }
      }
      sessionsTwoDaysAgo: anonymousSession {
        events_aggregate(
          where: {type: {_eq: "pageview"}, created_at: {_gte: $twoDaysAgo, _lt: $yesterday}}
        ) {
          aggregate {
            count(columns: id)
          }
          nodes {
            created_at
          }
        }
      }
    }
  }
}
    `;

/**
 * __useUserDashboardProjectsQuery__
 *
 * To run a query within a React component, call `useUserDashboardProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserDashboardProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserDashboardProjectsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      today: // value for 'today'
 *      yesterday: // value for 'yesterday'
 *      twoDaysAgo: // value for 'twoDaysAgo'
 *   },
 * });
 */
export function useUserDashboardProjectsQuery(baseOptions: Apollo.QueryHookOptions<UserDashboardProjectsQuery, UserDashboardProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserDashboardProjectsQuery, UserDashboardProjectsQueryVariables>(UserDashboardProjectsDocument, options);
      }
export function useUserDashboardProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserDashboardProjectsQuery, UserDashboardProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserDashboardProjectsQuery, UserDashboardProjectsQueryVariables>(UserDashboardProjectsDocument, options);
        }
export type UserDashboardProjectsQueryHookResult = ReturnType<typeof useUserDashboardProjectsQuery>;
export type UserDashboardProjectsLazyQueryHookResult = ReturnType<typeof useUserDashboardProjectsLazyQuery>;
export type UserDashboardProjectsQueryResult = Apollo.QueryResult<UserDashboardProjectsQuery, UserDashboardProjectsQueryVariables>;