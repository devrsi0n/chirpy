import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type CreateOneProjectMutationVariables = Types.Exact<{
  projectName: Types.Scalars['String'];
  userID: Types.Scalars['String'];
}>;

export type CreateOneProjectMutation = { __typename?: 'Mutation' } & {
  createOneProject: { __typename?: 'Project' } & Pick<Types.Project, 'id' | 'name'>;
};

export type ProjectAllCommentsQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type ProjectAllCommentsQuery = { __typename?: 'Query' } & {
  project?: Types.Maybe<
    { __typename?: 'Project' } & Pick<Types.Project, 'id'> & {
        pages: Array<
          { __typename?: 'Page' } & Pick<Types.Page, 'id'> & {
              comments: Array<
                { __typename?: 'Comment' } & Pick<Types.Comment, 'id' | 'content'> & {
                    user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'name' | 'avatar'>;
                    replies: Array<
                      { __typename?: 'Comment' } & Pick<Types.Comment, 'id' | 'content'> & {
                          user: { __typename?: 'User' } & Pick<
                            Types.User,
                            'id' | 'name' | 'avatar'
                          >;
                        }
                    >;
                  }
              >;
            }
        >;
      }
  >;
};

export const CreateOneProjectDocument = gql`
  mutation createOneProject($projectName: String!, $userID: String!) {
    createOneProject(data: { name: $projectName, user: { connect: { id: $userID } } }) {
      id
      name
    }
  }
`;
export type CreateOneProjectMutationFn = Apollo.MutationFunction<
  CreateOneProjectMutation,
  CreateOneProjectMutationVariables
>;

/**
 * __useCreateOneProjectMutation__
 *
 * To run a mutation, you first call `useCreateOneProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOneProjectMutation, { data, loading, error }] = useCreateOneProjectMutation({
 *   variables: {
 *      projectName: // value for 'projectName'
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useCreateOneProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOneProjectMutation,
    CreateOneProjectMutationVariables
  >,
) {
  return Apollo.useMutation<CreateOneProjectMutation, CreateOneProjectMutationVariables>(
    CreateOneProjectDocument,
    baseOptions,
  );
}
export type CreateOneProjectMutationHookResult = ReturnType<typeof useCreateOneProjectMutation>;
export type CreateOneProjectMutationResult = Apollo.MutationResult<CreateOneProjectMutation>;
export type CreateOneProjectMutationOptions = Apollo.BaseMutationOptions<
  CreateOneProjectMutation,
  CreateOneProjectMutationVariables
>;
export const ProjectAllCommentsDocument = gql`
  query projectAllComments($id: String!) {
    project(where: { id: $id }) {
      id
      pages {
        id
        comments {
          id
          content
          user {
            id
            name
            avatar
          }
          replies {
            id
            content
            user {
              id
              name
              avatar
            }
          }
        }
      }
    }
  }
`;

/**
 * __useProjectAllCommentsQuery__
 *
 * To run a query within a React component, call `useProjectAllCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectAllCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectAllCommentsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectAllCommentsQuery(
  baseOptions: Apollo.QueryHookOptions<ProjectAllCommentsQuery, ProjectAllCommentsQueryVariables>,
) {
  return Apollo.useQuery<ProjectAllCommentsQuery, ProjectAllCommentsQueryVariables>(
    ProjectAllCommentsDocument,
    baseOptions,
  );
}
export function useProjectAllCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectAllCommentsQuery,
    ProjectAllCommentsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<ProjectAllCommentsQuery, ProjectAllCommentsQueryVariables>(
    ProjectAllCommentsDocument,
    baseOptions,
  );
}
export type ProjectAllCommentsQueryHookResult = ReturnType<typeof useProjectAllCommentsQuery>;
export type ProjectAllCommentsLazyQueryHookResult = ReturnType<
  typeof useProjectAllCommentsLazyQuery
>;
export type ProjectAllCommentsQueryResult = Apollo.QueryResult<
  ProjectAllCommentsQuery,
  ProjectAllCommentsQueryVariables
>;
