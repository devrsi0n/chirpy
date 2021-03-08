import * as Types from './types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type UpsertUserMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
  username: Types.Scalars['String'];
  displayName: Types.Scalars['String'];
  avatar?: Types.Maybe<Types.Scalars['String']>;
  userType: Types.UserType_Enum;
  compoundId: Types.Scalars['String'];
  provider: Types.AccountProvider_Enum;
  providerAccountId: Types.Scalars['String'];
}>;

export type UpsertUserMutation = { __typename?: 'mutation_root' } & {
  insertOneUser?: Types.Maybe<
    { __typename?: 'User' } & Pick<
      Types.User,
      'id' | 'email' | 'username' | 'displayName' | 'avatar' | 'type' | 'updatedAt'
    > & {
        accounts: Array<
          { __typename?: 'Account' } & Pick<
            Types.Account,
            'id' | 'compoundId' | 'provider' | 'providerAccountId' | 'updatedAt'
          >
        >;
      }
  >;
};

export type UserByPkQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;

export type UserByPkQuery = { __typename?: 'query_root' } & {
  userByPk?: Types.Maybe<
    { __typename?: 'User' } & Pick<
      Types.User,
      'id' | 'email' | 'username' | 'type' | 'avatar' | 'displayName' | 'updatedAt' | 'createdAt'
    >
  >;
};

export const UpsertUserDocument: DocumentNode<UpsertUserMutation, UpsertUserMutationVariables> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'upsertUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'username' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'displayName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'avatar' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userType' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UserType_enum' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'compoundId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'provider' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'AccountProvider_enum' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'providerAccountId' } },
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
            name: { kind: 'Name', value: 'insertOneUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'object' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'email' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'username' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'username' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'displayName' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'displayName' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'avatar' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'avatar' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'type' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'userType' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'accounts' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'data' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'compoundId' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'compoundId' },
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
                                  name: { kind: 'Name', value: 'providerAccountId' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'providerAccountId' },
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'on_conflict' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'constraint' },
                                  value: { kind: 'EnumValue', value: 'Account_compoundId_key' },
                                },
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'update_columns' },
                                  value: {
                                    kind: 'ListValue',
                                    values: [
                                      { kind: 'EnumValue', value: 'provider' },
                                      { kind: 'EnumValue', value: 'providerAccountId' },
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
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'on_conflict' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'constraint' },
                      value: { kind: 'EnumValue', value: 'User_email_key' },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'update_columns' },
                      value: {
                        kind: 'ListValue',
                        values: [
                          { kind: 'EnumValue', value: 'displayName' },
                          { kind: 'EnumValue', value: 'username' },
                          { kind: 'EnumValue', value: 'avatar' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'accounts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'compoundId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'provider' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'providerAccountId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
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
};
export const UserByPkDocument: DocumentNode<UserByPkQuery, UserByPkQueryVariables> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'userByPk' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
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
            name: { kind: 'Name', value: 'userByPk' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
};
