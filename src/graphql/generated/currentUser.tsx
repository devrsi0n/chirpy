import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type CurrentUserQueryVariables = Types.Exact<{ [key: string]: never }>;

export type CurrentUserQuery = { __typename?: 'Query' } & {
  currentUser?: Types.Maybe<
    { __typename?: 'User' } & Pick<Types.User, 'id' | 'email' | 'name' | 'avatar'> & {
        members: Array<
          { __typename?: 'Member' } & Pick<Types.Member, 'id' | 'role'> & {
              team: { __typename?: 'Team' } & Pick<Types.Team, 'id' | 'name'> & {
                  projects: Array<{ __typename?: 'Project' } & Pick<Types.Project, 'id' | 'name'>>;
                };
            }
        >;
        projects: Array<{ __typename?: 'Project' } & Pick<Types.Project, 'id' | 'name'>>;
      }
  >;
};

export const CurrentUserDocument = gql`
  query currentUser {
    currentUser {
      id
      email
      name
      avatar
      members {
        id
        role
        team {
          id
          name
          projects {
            id
            name
          }
        }
      }
      projects {
        id
        name
      }
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
 *   },
 * });
 */
export function useCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>,
) {
  return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    baseOptions,
  );
}
export function useCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>,
) {
  return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    baseOptions,
  );
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<
  CurrentUserQuery,
  CurrentUserQueryVariables
>;
