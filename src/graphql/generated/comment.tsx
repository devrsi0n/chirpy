import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type CreateOneCommentMutationVariables = Types.Exact<{
  pageId: Types.Scalars['String'];
  content: Types.Scalars['Json'];
  userId: Types.Scalars['String'];
}>;

export type CreateOneCommentMutation = { __typename?: 'Mutation' } & {
  createOneComment: { __typename?: 'Comment' } & Pick<
    Types.Comment,
    'id' | 'pageId' | 'content' | 'parentId' | 'createdAt'
  > & {
      user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'name' | 'avatar'>;
      likes: Array<
        { __typename?: 'Like' } & Pick<Types.Like, 'id'> & {
            user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'name' | 'avatar'>;
          }
      >;
    };
};

export type CreateOneReplyMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  content: Types.Scalars['Json'];
  userId: Types.Scalars['String'];
  pageId: Types.Scalars['String'];
}>;

export type CreateOneReplyMutation = { __typename?: 'Mutation' } & {
  updateOneComment?: Types.Maybe<
    { __typename?: 'Comment' } & Pick<Types.Comment, 'id' | 'pageId' | 'content' | 'createdAt'> & {
        likes: Array<
          { __typename?: 'Like' } & Pick<Types.Like, 'id'> & {
              user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'name' | 'avatar'>;
            }
        >;
        user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'name' | 'avatar'>;
        replies: Array<
          { __typename?: 'Comment' } & Pick<
            Types.Comment,
            'id' | 'pageId' | 'content' | 'createdAt'
          > & {
              user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'name' | 'avatar'>;
              likes: Array<
                { __typename?: 'Like' } & Pick<Types.Like, 'id'> & {
                    user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'name' | 'avatar'>;
                  }
              >;
              replies: Array<
                { __typename?: 'Comment' } & Pick<
                  Types.Comment,
                  'id' | 'pageId' | 'content' | 'createdAt'
                > & {
                    user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'name' | 'avatar'>;
                    likes: Array<
                      { __typename?: 'Like' } & Pick<Types.Like, 'id'> & {
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

export type CommentsByPageQueryVariables = Types.Exact<{
  pageId: Types.Scalars['String'];
}>;

export type CommentsByPageQuery = { __typename?: 'Query' } & {
  comments: Array<
    { __typename?: 'Comment' } & Pick<
      Types.Comment,
      'id' | 'pageId' | 'content' | 'parentId' | 'createdAt'
    > & {
        user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'name' | 'avatar'>;
        likes: Array<
          { __typename?: 'Like' } & Pick<Types.Like, 'id'> & {
              user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'name' | 'avatar'>;
            }
        >;
        replies: Array<
          { __typename?: 'Comment' } & Pick<
            Types.Comment,
            'id' | 'pageId' | 'parentId' | 'content' | 'createdAt'
          > & {
              user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'name' | 'avatar'>;
              likes: Array<
                { __typename?: 'Like' } & Pick<Types.Like, 'id'> & {
                    user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'name' | 'avatar'>;
                  }
              >;
              replies: Array<
                { __typename?: 'Comment' } & Pick<
                  Types.Comment,
                  'id' | 'pageId' | 'parentId' | 'content' | 'createdAt'
                > & {
                    user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'name' | 'avatar'>;
                    likes: Array<
                      { __typename?: 'Like' } & Pick<Types.Like, 'id'> & {
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

export type CommentDetailsQueryVariables = Types.Exact<{
  commentId?: Types.Maybe<Types.Scalars['String']>;
}>;

export type CommentDetailsQuery = { __typename?: 'Query' } & {
  comment?: Types.Maybe<
    { __typename?: 'Comment' } & Pick<Types.Comment, 'id' | 'content' | 'createdAt'> & {
        user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'name' | 'avatar'>;
        likes: Array<
          { __typename?: 'Like' } & Pick<Types.Like, 'id'> & {
              user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'name' | 'avatar'>;
            }
        >;
        replies: Array<
          { __typename?: 'Comment' } & Pick<Types.Comment, 'id' | 'content' | 'createdAt'> & {
              user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'name' | 'avatar'>;
              likes: Array<
                { __typename?: 'Like' } & Pick<Types.Like, 'id'> & {
                    user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'name' | 'avatar'>;
                  }
              >;
            }
        >;
        parent?: Types.Maybe<
          { __typename?: 'Comment' } & Pick<Types.Comment, 'id' | 'content' | 'createdAt'> & {
              user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'name' | 'avatar'>;
              likes: Array<
                { __typename?: 'Like' } & Pick<Types.Like, 'id'> & {
                    user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'name' | 'avatar'>;
                  }
              >;
              parent?: Types.Maybe<
                { __typename?: 'Comment' } & Pick<Types.Comment, 'id' | 'content' | 'createdAt'> & {
                    user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'name' | 'avatar'>;
                    likes: Array<
                      { __typename?: 'Like' } & Pick<Types.Like, 'id'> & {
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

export const CreateOneCommentDocument = gql`
  mutation createOneComment($pageId: String!, $content: Json!, $userId: String!) {
    createOneComment(
      data: {
        content: $content
        page: { connect: { id: $pageId } }
        user: { connect: { id: $userId } }
      }
    ) {
      id
      pageId
      content
      parentId
      createdAt
      user {
        id
        name
        avatar
      }
      likes {
        id
        user {
          id
          name
          avatar
        }
      }
    }
  }
`;
export type CreateOneCommentMutationFn = Apollo.MutationFunction<
  CreateOneCommentMutation,
  CreateOneCommentMutationVariables
>;

/**
 * __useCreateOneCommentMutation__
 *
 * To run a mutation, you first call `useCreateOneCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOneCommentMutation, { data, loading, error }] = useCreateOneCommentMutation({
 *   variables: {
 *      pageId: // value for 'pageId'
 *      content: // value for 'content'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateOneCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOneCommentMutation,
    CreateOneCommentMutationVariables
  >,
) {
  return Apollo.useMutation<CreateOneCommentMutation, CreateOneCommentMutationVariables>(
    CreateOneCommentDocument,
    baseOptions,
  );
}
export type CreateOneCommentMutationHookResult = ReturnType<typeof useCreateOneCommentMutation>;
export type CreateOneCommentMutationResult = Apollo.MutationResult<CreateOneCommentMutation>;
export type CreateOneCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateOneCommentMutation,
  CreateOneCommentMutationVariables
>;
export const CreateOneReplyDocument = gql`
  mutation createOneReply($id: String!, $content: Json!, $userId: String!, $pageId: String!) {
    updateOneComment(
      where: { id: $id }
      data: {
        replies: {
          create: {
            content: $content
            parent: { connect: { id: $id } }
            user: { connect: { id: $userId } }
            page: { connect: { id: $pageId } }
          }
        }
      }
    ) {
      id
      pageId
      content
      createdAt
      likes {
        id
        user {
          id
          name
          avatar
        }
      }
      user {
        id
        name
        avatar
      }
      replies {
        id
        pageId
        content
        createdAt
        user {
          id
          name
          avatar
        }
        likes {
          id
          user {
            id
            name
            avatar
          }
        }
        replies {
          id
          pageId
          content
          createdAt
          user {
            id
            name
            avatar
          }
          likes {
            id
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
export type CreateOneReplyMutationFn = Apollo.MutationFunction<
  CreateOneReplyMutation,
  CreateOneReplyMutationVariables
>;

/**
 * __useCreateOneReplyMutation__
 *
 * To run a mutation, you first call `useCreateOneReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOneReplyMutation, { data, loading, error }] = useCreateOneReplyMutation({
 *   variables: {
 *      id: // value for 'id'
 *      content: // value for 'content'
 *      userId: // value for 'userId'
 *      pageId: // value for 'pageId'
 *   },
 * });
 */
export function useCreateOneReplyMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateOneReplyMutation, CreateOneReplyMutationVariables>,
) {
  return Apollo.useMutation<CreateOneReplyMutation, CreateOneReplyMutationVariables>(
    CreateOneReplyDocument,
    baseOptions,
  );
}
export type CreateOneReplyMutationHookResult = ReturnType<typeof useCreateOneReplyMutation>;
export type CreateOneReplyMutationResult = Apollo.MutationResult<CreateOneReplyMutation>;
export type CreateOneReplyMutationOptions = Apollo.BaseMutationOptions<
  CreateOneReplyMutation,
  CreateOneReplyMutationVariables
>;
export const CommentsByPageDocument = gql`
  query commentsByPage($pageId: String!) {
    comments(where: { pageId: { equals: $pageId }, parentId: { equals: null } }) {
      id
      pageId
      content
      parentId
      createdAt
      user {
        id
        name
        avatar
      }
      likes {
        id
        user {
          id
          name
          avatar
        }
      }
      replies {
        id
        pageId
        parentId
        content
        createdAt
        user {
          id
          name
          avatar
        }
        likes {
          id
          user {
            id
            name
            avatar
          }
        }
        replies {
          id
          pageId
          parentId
          content
          createdAt
          user {
            id
            name
            avatar
          }
          likes {
            id
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
 * __useCommentsByPageQuery__
 *
 * To run a query within a React component, call `useCommentsByPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsByPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsByPageQuery({
 *   variables: {
 *      pageId: // value for 'pageId'
 *   },
 * });
 */
export function useCommentsByPageQuery(
  baseOptions: Apollo.QueryHookOptions<CommentsByPageQuery, CommentsByPageQueryVariables>,
) {
  return Apollo.useQuery<CommentsByPageQuery, CommentsByPageQueryVariables>(
    CommentsByPageDocument,
    baseOptions,
  );
}
export function useCommentsByPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CommentsByPageQuery, CommentsByPageQueryVariables>,
) {
  return Apollo.useLazyQuery<CommentsByPageQuery, CommentsByPageQueryVariables>(
    CommentsByPageDocument,
    baseOptions,
  );
}
export type CommentsByPageQueryHookResult = ReturnType<typeof useCommentsByPageQuery>;
export type CommentsByPageLazyQueryHookResult = ReturnType<typeof useCommentsByPageLazyQuery>;
export type CommentsByPageQueryResult = Apollo.QueryResult<
  CommentsByPageQuery,
  CommentsByPageQueryVariables
>;
export const CommentDetailsDocument = gql`
  query commentDetails($commentId: String) {
    comment(where: { id: $commentId }) {
      id
      content
      createdAt
      user {
        id
        name
        avatar
      }
      likes {
        id
        user {
          id
          name
          avatar
        }
      }
      replies {
        id
        content
        createdAt
        user {
          id
          name
          avatar
        }
        likes {
          id
          user {
            id
            name
            avatar
          }
        }
      }
      parent {
        id
        content
        createdAt
        user {
          id
          name
          avatar
        }
        likes {
          id
          user {
            id
            name
            avatar
          }
        }
        parent {
          id
          content
          createdAt
          user {
            id
            name
            avatar
          }
          likes {
            id
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
 * __useCommentDetailsQuery__
 *
 * To run a query within a React component, call `useCommentDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentDetailsQuery({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useCommentDetailsQuery(
  baseOptions?: Apollo.QueryHookOptions<CommentDetailsQuery, CommentDetailsQueryVariables>,
) {
  return Apollo.useQuery<CommentDetailsQuery, CommentDetailsQueryVariables>(
    CommentDetailsDocument,
    baseOptions,
  );
}
export function useCommentDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CommentDetailsQuery, CommentDetailsQueryVariables>,
) {
  return Apollo.useLazyQuery<CommentDetailsQuery, CommentDetailsQueryVariables>(
    CommentDetailsDocument,
    baseOptions,
  );
}
export type CommentDetailsQueryHookResult = ReturnType<typeof useCommentDetailsQuery>;
export type CommentDetailsLazyQueryHookResult = ReturnType<typeof useCommentDetailsLazyQuery>;
export type CommentDetailsQueryResult = Apollo.QueryResult<
  CommentDetailsQuery,
  CommentDetailsQueryVariables
>;
