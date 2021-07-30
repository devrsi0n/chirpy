import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type InsertOneProjectMutationVariables = Types.Exact<{
  teamId?: Types.Maybe<Types.Scalars['uuid']>;
  userId?: Types.Maybe<Types.Scalars['Int']>;
  name: Types.Scalars['String'];
  domain: Types.Scalars['String'];
}>;


export type InsertOneProjectMutation = (
  { __typename?: 'mutation_root' }
  & { insertOneProject?: Types.Maybe<(
    { __typename?: 'Project' }
    & Pick<Types.Project, 'id' | 'name' | 'teamId' | 'userId'>
  )> }
);

export type UpdateThemeMutationVariables = Types.Exact<{
  projectId: Types.Scalars['uuid'];
  theme: Types.Scalars['jsonb'];
}>;


export type UpdateThemeMutation = (
  { __typename?: 'mutation_root' }
  & { updateProjectByPk?: Types.Maybe<(
    { __typename?: 'Project' }
    & Pick<Types.Project, 'id'>
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


export const InsertOneProjectDocument = gql`
    mutation insertOneProject($teamId: uuid, $userId: Int, $name: String!, $domain: String!) {
  insertOneProject(
    object: {teamId: $teamId, userId: $userId, name: $name, domain: $domain}
  ) {
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
 *      teamId: // value for 'teamId'
 *      userId: // value for 'userId'
 *      name: // value for 'name'
 *      domain: // value for 'domain'
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
export const UpdateThemeDocument = gql`
    mutation updateTheme($projectId: uuid!, $theme: jsonb!) {
  updateProjectByPk(pk_columns: {id: $projectId}, _set: {theme: $theme}) {
    id
  }
}
    `;
export type UpdateThemeMutationFn = Apollo.MutationFunction<UpdateThemeMutation, UpdateThemeMutationVariables>;

/**
 * __useUpdateThemeMutation__
 *
 * To run a mutation, you first call `useUpdateThemeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateThemeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateThemeMutation, { data, loading, error }] = useUpdateThemeMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      theme: // value for 'theme'
 *   },
 * });
 */
export function useUpdateThemeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateThemeMutation, UpdateThemeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateThemeMutation, UpdateThemeMutationVariables>(UpdateThemeDocument, options);
      }
export type UpdateThemeMutationHookResult = ReturnType<typeof useUpdateThemeMutation>;
export type UpdateThemeMutationResult = Apollo.MutationResult<UpdateThemeMutation>;
export type UpdateThemeMutationOptions = Apollo.BaseMutationOptions<UpdateThemeMutation, UpdateThemeMutationVariables>;
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
      sessionsYesterday: sessions {
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
      sessionsTwoDaysAgo: sessions {
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