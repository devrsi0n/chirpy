import * as Types from './types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type AdapterUserFragment = {
  __typename?: 'User';
  id: string;
  name?: string | null;
  username?: string | null;
  image?: string | null;
  email?: string | null;
  emailVerified?: string | null;
  type?: Types.UserType_Enum | null;
  bio?: string | null;
  website?: string | null;
  twitterUserName?: string | null;
};

export type UpdateUserByPkMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
  username?: Types.InputMaybe<Types.Scalars['String']>;
  bio?: Types.InputMaybe<Types.Scalars['String']>;
  website?: Types.InputMaybe<Types.Scalars['String']>;
  twitterUserName?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type UpdateUserByPkMutation = {
  __typename?: 'mutation_root';
  updateUserByPk?: { __typename?: 'User'; id: string } | null;
};

export type UserBeforeUpdateQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;

export type UserBeforeUpdateQuery = {
  __typename?: 'query_root';
  userByPk?: {
    __typename?: 'User';
    username?: string | null;
    bio?: string | null;
    website?: string | null;
    twitterUserName?: string | null;
  } | null;
};

export type UpdateUserProfileByPkMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
  email?: Types.InputMaybe<Types.Scalars['String']>;
  name?: Types.InputMaybe<Types.Scalars['String']>;
  image?: Types.InputMaybe<Types.Scalars['String']>;
  emailVerified?: Types.InputMaybe<Types.Scalars['timestamptz']>;
}>;

export type UpdateUserProfileByPkMutation = {
  __typename?: 'mutation_root';
  updateUserByPk?: {
    __typename?: 'User';
    id: string;
    name?: string | null;
    username?: string | null;
    image?: string | null;
    email?: string | null;
    emailVerified?: string | null;
    type?: Types.UserType_Enum | null;
    bio?: string | null;
    website?: string | null;
    twitterUserName?: string | null;
  } | null;
};

export type UserByPkBeforeUpdateQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;

export type UserByPkBeforeUpdateQuery = {
  __typename?: 'query_root';
  userByPk?: {
    __typename?: 'User';
    id: string;
    email?: string | null;
    name?: string | null;
    username?: string | null;
    image?: string | null;
    emailVerified?: string | null;
  } | null;
};

export type UpdateUserProfileByEmailMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
  name?: Types.InputMaybe<Types.Scalars['String']>;
  image?: Types.InputMaybe<Types.Scalars['String']>;
  emailVerified?: Types.InputMaybe<Types.Scalars['timestamptz']>;
}>;

export type UpdateUserProfileByEmailMutation = {
  __typename?: 'mutation_root';
  updateUsers?: {
    __typename?: 'User_mutation_response';
    returning: Array<{
      __typename?: 'User';
      id: string;
      name?: string | null;
      username?: string | null;
      image?: string | null;
      email?: string | null;
      emailVerified?: string | null;
      type?: Types.UserType_Enum | null;
      bio?: string | null;
      website?: string | null;
      twitterUserName?: string | null;
    }>;
  } | null;
};

export type UserByEmailBeforeUpdateQueryVariables = Types.Exact<{
  email: Types.Scalars['String'];
}>;

export type UserByEmailBeforeUpdateQuery = {
  __typename?: 'query_root';
  users: Array<{
    __typename?: 'User';
    id: string;
    name?: string | null;
    username?: string | null;
    email?: string | null;
    image?: string | null;
    emailVerified?: string | null;
  }>;
};

export type UserByPkQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;

export type UserByPkQuery = {
  __typename?: 'query_root';
  userByPk?: {
    __typename?: 'User';
    id: string;
    email?: string | null;
    username?: string | null;
    type?: Types.UserType_Enum | null;
    image?: string | null;
    name?: string | null;
    emailVerified?: string | null;
    updatedAt: string;
    createdAt: string;
  } | null;
};

export type UserByEmailQueryVariables = Types.Exact<{
  email: Types.Scalars['String'];
}>;

export type UserByEmailQuery = {
  __typename?: 'query_root';
  users: Array<{
    __typename?: 'User';
    id: string;
    name?: string | null;
    username?: string | null;
    image?: string | null;
    email?: string | null;
    emailVerified?: string | null;
    type?: Types.UserType_Enum | null;
    bio?: string | null;
    website?: string | null;
    twitterUserName?: string | null;
  }>;
};

export type UserByAccountQueryVariables = Types.Exact<{
  provider: Types.Scalars['String'];
  providerAccountId: Types.Scalars['String'];
}>;

export type UserByAccountQuery = {
  __typename?: 'query_root';
  users: Array<{
    __typename?: 'User';
    id: string;
    name?: string | null;
    username?: string | null;
    image?: string | null;
    email?: string | null;
    emailVerified?: string | null;
    type?: Types.UserType_Enum | null;
    bio?: string | null;
    website?: string | null;
    twitterUserName?: string | null;
  }>;
};

export type AllUsersQueryVariables = Types.Exact<{ [key: string]: never }>;

export type AllUsersQuery = {
  __typename?: 'query_root';
  users: Array<{ __typename?: 'User'; username?: string | null }>;
};

export type DeleteUserMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;

export type DeleteUserMutation = {
  __typename?: 'mutation_root';
  deleteUserByPk?: { __typename?: 'User'; id: string } | null;
};

export type CreateUserMutationVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  username?: Types.InputMaybe<Types.Scalars['String']>;
  email?: Types.InputMaybe<Types.Scalars['String']>;
  emailVerified?: Types.InputMaybe<Types.Scalars['timestamptz']>;
  image?: Types.InputMaybe<Types.Scalars['String']>;
  type?: Types.InputMaybe<Types.UserType_Enum>;
}>;

export type CreateUserMutation = {
  __typename?: 'mutation_root';
  insertOneUser?: {
    __typename?: 'User';
    id: string;
    name?: string | null;
    username?: string | null;
    image?: string | null;
    email?: string | null;
    emailVerified?: string | null;
    type?: Types.UserType_Enum | null;
    bio?: string | null;
    website?: string | null;
    twitterUserName?: string | null;
  } | null;
};

export const AdapterUserFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'adapterUser' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'username' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailVerified' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'bio' } },
          { kind: 'Field', name: { kind: 'Name', value: 'website' } },
          { kind: 'Field', name: { kind: 'Name', value: 'twitterUserName' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdapterUserFragment, unknown>;
export const UpdateUserByPkDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateUserByPk' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'username' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'bio' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'website' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'twitterUserName' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateUserByPk' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pk_columns' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' },
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
                      name: { kind: 'Name', value: 'username' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'username' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'bio' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'bio' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'website' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'website' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'twitterUserName' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'twitterUserName' },
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
} as unknown as DocumentNode<
  UpdateUserByPkMutation,
  UpdateUserByPkMutationVariables
>;
export const UserBeforeUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'userBeforeUpdate' },
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
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bio' } },
                { kind: 'Field', name: { kind: 'Name', value: 'website' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'twitterUserName' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UserBeforeUpdateQuery,
  UserBeforeUpdateQueryVariables
>;
export const UpdateUserProfileByPkDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateUserProfileByPk' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'image' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'emailVerified' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'timestamptz' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateUserByPk' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pk_columns' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' },
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
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'name' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'email' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'email' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'image' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'image' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'emailVerified' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'emailVerified' },
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
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'adapterUser' },
                },
              ],
            },
          },
        ],
      },
    },
    ...AdapterUserFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  UpdateUserProfileByPkMutation,
  UpdateUserProfileByPkMutationVariables
>;
export const UserByPkBeforeUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'userByPkBeforeUpdate' },
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
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'emailVerified' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UserByPkBeforeUpdateQuery,
  UserByPkBeforeUpdateQueryVariables
>;
export const UpdateUserProfileByEmailDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateUserProfileByEmail' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'image' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'emailVerified' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'timestamptz' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateUsers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'email' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'email' },
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
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'name' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'image' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'image' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'emailVerified' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'emailVerified' },
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
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'adapterUser' },
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
    ...AdapterUserFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  UpdateUserProfileByEmailMutation,
  UpdateUserProfileByEmailMutationVariables
>;
export const UserByEmailBeforeUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'userByEmailBeforeUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
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
            name: { kind: 'Name', value: 'users' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'email' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'email' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'emailVerified' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UserByEmailBeforeUpdateQuery,
  UserByEmailBeforeUpdateQueryVariables
>;
export const UserByPkDocument = {
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
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'emailVerified' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserByPkQuery, UserByPkQueryVariables>;
export const UserByEmailDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'userByEmail' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
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
            name: { kind: 'Name', value: 'users' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'email' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'email' },
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
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'adapterUser' },
                },
              ],
            },
          },
        ],
      },
    },
    ...AdapterUserFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<UserByEmailQuery, UserByEmailQueryVariables>;
export const UserByAccountDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'userByAccount' },
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
            name: { kind: 'Name', value: 'users' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'accounts' },
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
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'adapterUser' },
                },
              ],
            },
          },
        ],
      },
    },
    ...AdapterUserFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<UserByAccountQuery, UserByAccountQueryVariables>;
export const AllUsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'allUsers' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AllUsersQuery, AllUsersQueryVariables>;
export const DeleteUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deleteUser' },
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
            name: { kind: 'Name', value: 'deleteUserByPk' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
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
} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const CreateUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'username' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'emailVerified' },
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
            name: { kind: 'Name', value: 'image' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'UserType_enum' },
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
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'name' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'username' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'username' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'email' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'email' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'emailVerified' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'emailVerified' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'image' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'image' },
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
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'adapterUser' },
                },
              ],
            },
          },
        ],
      },
    },
    ...AdapterUserFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
