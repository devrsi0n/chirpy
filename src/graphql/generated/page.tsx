import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type PageByProjectQueryVariables = Types.Exact<{
  projectId: Types.Scalars['String'];
  url: Types.Scalars['String'];
  title: Types.Scalars['String'];
}>;

export type PageByProjectQuery = { __typename?: 'Query' } & {
  getOrCreatePage?: Types.Maybe<{ __typename?: 'Page' } & Pick<Types.Page, 'id' | 'url' | 'title'>>;
};

export const PageByProjectDocument = gql`
  query pageByProject($projectId: String!, $url: String!, $title: String!) {
    getOrCreatePage(projectId: $projectId, url: $url, title: $title) {
      id
      url
      title
    }
  }
`;

/**
 * __usePageByProjectQuery__
 *
 * To run a query within a React component, call `usePageByProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageByProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageByProjectQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      url: // value for 'url'
 *      title: // value for 'title'
 *   },
 * });
 */
export function usePageByProjectQuery(
  baseOptions: Apollo.QueryHookOptions<PageByProjectQuery, PageByProjectQueryVariables>,
) {
  return Apollo.useQuery<PageByProjectQuery, PageByProjectQueryVariables>(
    PageByProjectDocument,
    baseOptions,
  );
}
export function usePageByProjectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PageByProjectQuery, PageByProjectQueryVariables>,
) {
  return Apollo.useLazyQuery<PageByProjectQuery, PageByProjectQueryVariables>(
    PageByProjectDocument,
    baseOptions,
  );
}
export type PageByProjectQueryHookResult = ReturnType<typeof usePageByProjectQuery>;
export type PageByProjectLazyQueryHookResult = ReturnType<typeof usePageByProjectLazyQuery>;
export type PageByProjectQueryResult = Apollo.QueryResult<
  PageByProjectQuery,
  PageByProjectQueryVariables
>;
