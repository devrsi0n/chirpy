import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ThemeOfPageQueryVariables = Types.Exact<{
  pageId: Types.Scalars['uuid'];
}>;


export type ThemeOfPageQuery = { __typename?: 'query_root', pageByPk?: { __typename?: 'Page', id: string, project: { __typename?: 'Project', id: string, theme?: any | null | undefined } } | null | undefined };


export const ThemeOfPageDocument = gql`
    query themeOfPage($pageId: uuid!) {
  pageByPk(id: $pageId) {
    id
    project {
      id
      theme
    }
  }
}
    `;

/**
 * __useThemeOfPageQuery__
 *
 * To run a query within a React component, call `useThemeOfPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useThemeOfPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useThemeOfPageQuery({
 *   variables: {
 *      pageId: // value for 'pageId'
 *   },
 * });
 */
export function useThemeOfPageQuery(baseOptions: Apollo.QueryHookOptions<ThemeOfPageQuery, ThemeOfPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ThemeOfPageQuery, ThemeOfPageQueryVariables>(ThemeOfPageDocument, options);
      }
export function useThemeOfPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ThemeOfPageQuery, ThemeOfPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ThemeOfPageQuery, ThemeOfPageQueryVariables>(ThemeOfPageDocument, options);
        }
export type ThemeOfPageQueryHookResult = ReturnType<typeof useThemeOfPageQuery>;
export type ThemeOfPageLazyQueryHookResult = ReturnType<typeof useThemeOfPageLazyQuery>;
export type ThemeOfPageQueryResult = Apollo.QueryResult<ThemeOfPageQuery, ThemeOfPageQueryVariables>;