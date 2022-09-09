import * as Types from './types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CommentsQueryVariables = Types.Exact<{
  newerThan: Types.Scalars['timestamptz'];
}>;

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
      project: {
        __typename?: 'Project';
        owner?: {
          __typename?: 'User';
          id: string;
          name?: string | null;
          email?: string | null;
          username?: string | null;
        } | null;
      };
    };
    triggeredBy: {
      __typename?: 'User';
      id: string;
      name?: string | null;
      username?: string | null;
    };
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
    author: {
      __typename?: 'User';
      id: string;
      name?: string | null;
      username?: string | null;
      email?: string | null;
    };
  } | null;
};

export type DeleteStaleCommentsMutationVariables = Types.Exact<{
  beforeDate: Types.Scalars['timestamptz'];
  url: Types.Scalars['String'];
}>;

export type DeleteStaleCommentsMutation = {
  __typename?: 'mutation_root';
  deleteComments?: {
    __typename?: 'Comment_mutation_response';
    affected_rows: number;
  } | null;
};

export const CommentsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'comments' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'newerThan' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'timestamptz' },
            },
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
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'createdAt' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_gt' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'newerThan' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
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
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'commentId' },
          },
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
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'commentId' },
                },
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
                              alias: { kind: 'Name', value: 'owner' },
                              name: { kind: 'Name', value: 'user' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'email' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'username' },
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
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'triggeredBy' },
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'username' },
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
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'commentId' },
          },
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
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'commentId' },
                },
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
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'username' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
  AuthorByCommentIdQuery,
  AuthorByCommentIdQueryVariables
>;
export const DeleteStaleCommentsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deleteStaleComments' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'beforeDate' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'timestamptz' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'url' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteComments' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'createdAt' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_lt' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'beforeDate' },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'page' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'url' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'url' },
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
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'affected_rows' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteStaleCommentsMutation,
  DeleteStaleCommentsMutationVariables
>;
