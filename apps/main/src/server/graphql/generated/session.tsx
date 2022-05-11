import * as Types from './types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CreateSessionMutationVariables = Types.Exact<{
  userId?: Types.InputMaybe<Types.Scalars['uuid']>;
  sessionToken: Types.Scalars['String'];
  expires: Types.Scalars['timestamptz'];
}>;

export type CreateSessionMutation = {
  __typename?: 'mutation_root';
  insertOneSession?: {
    __typename?: 'Session';
    id: string;
    expires: string;
    sessionToken: string;
    userId: string;
  } | null;
};

export type SessionAndUserQueryVariables = Types.Exact<{
  sessionToken: Types.Scalars['String'];
}>;

export type SessionAndUserQuery = {
  __typename?: 'query_root';
  sessions: Array<{
    __typename?: 'Session';
    id: string;
    expires: string;
    sessionToken: string;
    userId: string;
    user: {
      __typename?: 'User';
      id: string;
      name?: string | null;
      avatar?: string | null;
      email?: string | null;
      emailVerified?: string | null;
    };
  }>;
};

export type UpdateSessionMutationVariables = Types.Exact<{
  sessionToken: Types.Scalars['String'];
  userId?: Types.InputMaybe<Types.Scalars['uuid']>;
  expires?: Types.InputMaybe<Types.Scalars['timestamptz']>;
}>;

export type UpdateSessionMutation = {
  __typename?: 'mutation_root';
  updateSessions?: {
    __typename?: 'Session_mutation_response';
    returning: Array<{
      __typename?: 'Session';
      id: string;
      expires: string;
      sessionToken: string;
      userId: string;
    }>;
  } | null;
};

export type DeleteSessionMutationVariables = Types.Exact<{
  sessionToken: Types.Scalars['String'];
}>;

export type DeleteSessionMutation = {
  __typename?: 'mutation_root';
  deleteSessions?: {
    __typename?: 'Session_mutation_response';
    returning: Array<{
      __typename?: 'Session';
      id: string;
      expires: string;
      sessionToken: string;
      userId: string;
    }>;
  } | null;
};

export const CreateSessionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createSession' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sessionToken' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'expires' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'timestamptz' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'insertOneSession' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'object' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'userId' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'sessionToken' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'sessionToken' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'expires' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'expires' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'expires' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sessionToken' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateSessionMutation, CreateSessionMutationVariables>;
export const SessionAndUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'sessionAndUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sessionToken' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'sessionToken' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'sessionToken' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'expires' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sessionToken' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'emailVerified' } },
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
} as unknown as DocumentNode<SessionAndUserQuery, SessionAndUserQueryVariables>;
export const UpdateSessionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateSession' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sessionToken' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'expires' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'timestamptz' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateSessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'sessionToken' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'sessionToken' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_set' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'userId' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'expires' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'expires' } },
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
                  name: { kind: 'Name', value: 'returning' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'expires' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'sessionToken' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
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
} as unknown as DocumentNode<UpdateSessionMutation, UpdateSessionMutationVariables>;
export const DeleteSessionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deleteSession' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sessionToken' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteSessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'sessionToken' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'sessionToken' },
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
                  name: { kind: 'Name', value: 'returning' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'expires' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'sessionToken' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
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
} as unknown as DocumentNode<DeleteSessionMutation, DeleteSessionMutationVariables>;
