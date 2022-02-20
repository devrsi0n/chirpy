import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

import * as Types from './types';

export type CommentContentFragment = {
  __typename?: 'Comment';
  id: string;
  content: any;
  createdAt: string;
  deletedAt?: string | null;
  parentId?: string | null;
  pageId: string;
  comment: any;
  user: { __typename?: 'User'; id: string; name?: string | null; avatar?: string | null };
  likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
};

export type CommentsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type CommentsQuery = {
  __typename?: 'query_root';
  comments: Array<{ __typename?: 'Comment'; id: string }>;
};

export type SiteOwnerByTriggerCommentIdQueryVariables = Types.Exact<{
  commentId: Types.Scalars['uuid'];
}>;

export type SiteOwnerByTriggerCommentIdQuery = {
  __typename?: 'query_root';
  commentByPk?: {
    __typename?: 'Comment';
    page: {
      __typename?: 'Page';
      id: string;
      url: string;
      project: { __typename?: 'Project'; ownerId?: string | null };
    };
    triggeredBy: { __typename?: 'User'; id: string; name?: string | null };
  } | null;
};

export type AuthorByCommentIdQueryVariables = Types.Exact<{
  commentId: Types.Scalars['uuid'];
}>;

export type AuthorByCommentIdQuery = {
  __typename?: 'query_root';
  commentByPk?: {
    __typename?: 'Comment';
    page: { __typename?: 'Page'; id: string; url: string };
    author: { __typename?: 'User'; id: string; name?: string | null };
  } | null;
};

export type CommentListQueryVariables = Types.Exact<{
  limit: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
}>;

export type CommentListQuery = {
  __typename?: 'query_root';
  comments: Array<{
    __typename?: 'Comment';
    id: string;
    content: any;
    createdAt: string;
    deletedAt?: string | null;
    parentId?: string | null;
    pageId: string;
    comment: any;
    replies: Array<{
      __typename?: 'Comment';
      id: string;
      content: any;
      createdAt: string;
      deletedAt?: string | null;
      parentId?: string | null;
      pageId: string;
      comment: any;
      replies: Array<{
        __typename?: 'Comment';
        id: string;
        content: any;
        createdAt: string;
        deletedAt?: string | null;
        parentId?: string | null;
        pageId: string;
        comment: any;
        user: { __typename?: 'User'; id: string; name?: string | null; avatar?: string | null };
        likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
      }>;
      user: { __typename?: 'User'; id: string; name?: string | null; avatar?: string | null };
      likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
    }>;
    user: { __typename?: 'User'; id: string; name?: string | null; avatar?: string | null };
    likes: Array<{ __typename?: 'Like'; id: string; userId: string }>;
  }>;
};

export const CommentContentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'commentContent' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Comment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'comment' },
            name: { kind: 'Name', value: 'content' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'path' },
                value: { kind: 'StringValue', value: 'content', block: false },
              },
            ],
          },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'deletedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'parentId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'pageId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'likes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CommentContentFragment, unknown>;
export const CommentsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'comments' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'comments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CommentsQuery, CommentsQueryVariables>;
export const SiteOwnerByTriggerCommentIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'siteOwnerByTriggerCommentId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'commentId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'commentByPk' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'commentId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'page' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'project' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              alias: { kind: 'Name', value: 'ownerId' },
                              name: { kind: 'Name', value: 'userId' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'triggeredBy' },
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SiteOwnerByTriggerCommentIdQuery,
  SiteOwnerByTriggerCommentIdQueryVariables
>;
export const AuthorByCommentIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'authorByCommentId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'commentId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'commentByPk' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'commentId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'page' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'author' },
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AuthorByCommentIdQuery, AuthorByCommentIdQueryVariables>;
export const CommentListDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'commentList' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'comments' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'commentContent' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'replies' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'order_by' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'likes_aggregate' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'count' },
                                  value: { kind: 'EnumValue', value: 'desc' },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'createdAt' },
                            value: { kind: 'EnumValue', value: 'asc' },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'commentContent' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'replies' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'order_by' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'likes_aggregate' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'count' },
                                        value: { kind: 'EnumValue', value: 'desc' },
                                      },
                                    ],
                                  },
                                },
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'createdAt' },
                                  value: { kind: 'EnumValue', value: 'asc' },
                                },
                              ],
                            },
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'commentContent' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...CommentContentFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<CommentListQuery, CommentListQueryVariables>;
