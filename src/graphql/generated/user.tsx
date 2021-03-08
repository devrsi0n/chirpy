import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type UserByPkQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;

export type UserByPkQuery = { __typename?: 'query_root' } & {
  userByPk?: Types.Maybe<
    { __typename?: 'User' } & Pick<
      Types.User,
      'id' | 'email' | 'username' | 'displayName' | 'avatar'
    > & {
        members: Array<
          { __typename?: 'Member' } & Pick<Types.Member, 'id' | 'role' | 'teamId'> & {
              team: { __typename?: 'Team' } & Pick<Types.Team, 'id' | 'name' | 'uid'>;
            }
        >;
        projects: Array<{ __typename?: 'Project' } & Pick<Types.Project, 'id' | 'name'>>;
      }
  >;
};

export const UserByPkDocument = gql`
  query userByPk($id: uuid!) {
    userByPk(id: $id) {
      id
      email
      username
      displayName
      avatar
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
export function useUserByPkQuery(
  baseOptions: Apollo.QueryHookOptions<UserByPkQuery, UserByPkQueryVariables>,
) {
  return Apollo.useQuery<UserByPkQuery, UserByPkQueryVariables>(UserByPkDocument, baseOptions);
}
export function useUserByPkLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserByPkQuery, UserByPkQueryVariables>,
) {
  return Apollo.useLazyQuery<UserByPkQuery, UserByPkQueryVariables>(UserByPkDocument, baseOptions);
}
export type UserByPkQueryHookResult = ReturnType<typeof useUserByPkQuery>;
export type UserByPkLazyQueryHookResult = ReturnType<typeof useUserByPkLazyQuery>;
export type UserByPkQueryResult = Apollo.QueryResult<UserByPkQuery, UserByPkQueryVariables>;
