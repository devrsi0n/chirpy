import * as Types from './types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ThemeOfPageQueryVariables = Types.Exact<{
  pageId: Types.Scalars['uuid'];
}>;

export type ThemeOfPageQuery = {
  __typename?: 'query_root';
  pageByPk?: {
    __typename?: 'Page';
    id: string;
    url: string;
    project: { __typename?: 'Project'; id: string; theme?: any | null };
  } | null;
};

export const ThemeOfPageDocument = gql`
  query themeOfPage($pageId: uuid!) {
    pageByPk(id: $pageId) {
      id
      url
      project {
        id
        theme
      }
    }
  }
`;

export function useThemeOfPageQuery(
  options: Omit<Urql.UseQueryArgs<ThemeOfPageQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ThemeOfPageQuery>({
    query: ThemeOfPageDocument,
    ...options,
  });
}
