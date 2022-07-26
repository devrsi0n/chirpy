import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

import * as Types from './types';

export type CreateAccountMutationVariables = Types.Exact<{
  userId: Types.Scalars['uuid'];
  provider?: Types.InputMaybe<Types.Scalars['String']>;
  accessToken?: Types.InputMaybe<Types.Scalars['String']>;
  expiresAt?: Types.InputMaybe<Types.Scalars['timestamptz']>;
  idToken?: Types.InputMaybe<Types.Scalars['String']>;
  oauthToken?: Types.InputMaybe<Types.Scalars['String']>;
  oauthTokenSecret?: Types.InputMaybe<Types.Scalars['String']>;
  providerAccountId?: Types.InputMaybe<Types.Scalars['String']>;
  refreshToken?: Types.InputMaybe<Types.Scalars['String']>;
  scope?: Types.InputMaybe<Types.Scalars['String']>;
  sessionState?: Types.InputMaybe<Types.Scalars['String']>;
  tokenType?: Types.InputMaybe<Types.Scalars['String']>;
  type?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type CreateAccountMutation = {
  __typename?: 'mutation_root';
  insertOneAccount?: {
    __typename?: 'Account';
    id: string;
    userId: string;
    provider: string;
    accessToken?: string | null;
    expiresAt?: string | null;
    idToken?: string | null;
    oauthToken?: string | null;
    oauthTokenSecret?: string | null;
    providerAccountId: string;
    refreshToken?: string | null;
    scope?: string | null;
    sessionState?: string | null;
    tokenType?: string | null;
    type: string;
  } | null;
};

export type DeleteAccountMutationVariables = Types.Exact<{
  provider: Types.Scalars['String'];
  providerAccountId: Types.Scalars['String'];
}>;

export type DeleteAccountMutation = {
  __typename?: 'mutation_root';
  deleteAccounts?: {
    __typename?: 'Account_mutation_response';
    returning: Array<{ __typename?: 'Account'; id: string }>;
  } | null;
};

export const CreateAccountDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createAccount' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'provider' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accessToken' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'expiresAt' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'timestamptz' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'idToken' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'oauthToken' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'oauthTokenSecret' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'providerAccountId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'refreshToken' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'scope' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'sessionState' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'tokenType' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'insertOneAccount' },
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
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'userId' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'provider' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'provider' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'accessToken' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'accessToken' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'expiresAt' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'expiresAt' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'idToken' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'idToken' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'oauthToken' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'oauthToken' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'oauthTokenSecret' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'oauthTokenSecret' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'providerAccountId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'providerAccountId' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'refreshToken' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'refreshToken' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'scope' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'scope' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'sessionState' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'sessionState' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'tokenType' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'tokenType' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'type' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'type' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'provider' } },
                { kind: 'Field', name: { kind: 'Name', value: 'accessToken' } },
                { kind: 'Field', name: { kind: 'Name', value: 'expiresAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'idToken' } },
                { kind: 'Field', name: { kind: 'Name', value: 'oauthToken' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'oauthTokenSecret' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'providerAccountId' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'refreshToken' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'scope' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sessionState' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'tokenType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateAccountMutation,
  CreateAccountMutationVariables
>;
export const DeleteAccountDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deleteAccount' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'provider' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'providerAccountId' },
          },
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
            name: { kind: 'Name', value: 'deleteAccounts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'provider' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'provider' },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'providerAccountId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: {
                                kind: 'Name',
                                value: 'providerAccountId',
                              },
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
  DeleteAccountMutation,
  DeleteAccountMutationVariables
>;
