import * as Types from './types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type InsertOneAnonymousSessionMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
  projectId: Types.Scalars['uuid'];
  hostname?: Types.Maybe<Types.Scalars['String']>;
  language?: Types.Maybe<Types.Scalars['String']>;
  os?: Types.Maybe<Types.Scalars['String']>;
  screen?: Types.Maybe<Types.Scalars['String']>;
  device?: Types.Maybe<Types.Scalars['String']>;
  country?: Types.Maybe<Types.Scalars['String']>;
  browser?: Types.Maybe<Types.Scalars['String']>;
}>;


export type InsertOneAnonymousSessionMutation = (
  { __typename?: 'mutation_root' }
  & { insertOneAnonymousSession?: Types.Maybe<(
    { __typename?: 'AnonymousSession' }
    & Pick<Types.AnonymousSession, 'id'>
  )> }
);

export type AnonymousSessionByPkQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;


export type AnonymousSessionByPkQuery = (
  { __typename?: 'query_root' }
  & { anonymousSessionByPk?: Types.Maybe<(
    { __typename?: 'AnonymousSession' }
    & Pick<Types.AnonymousSession, 'id'>
  )> }
);


export const InsertOneAnonymousSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"insertOneAnonymousSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostname"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"language"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"os"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"screen"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"device"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"browser"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertOneAnonymousSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"hostname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostname"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"language"},"value":{"kind":"Variable","name":{"kind":"Name","value":"language"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"os"},"value":{"kind":"Variable","name":{"kind":"Name","value":"os"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"screen"},"value":{"kind":"Variable","name":{"kind":"Name","value":"screen"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"device"},"value":{"kind":"Variable","name":{"kind":"Name","value":"device"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"browser"},"value":{"kind":"Variable","name":{"kind":"Name","value":"browser"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<InsertOneAnonymousSessionMutation, InsertOneAnonymousSessionMutationVariables>;
export const AnonymousSessionByPkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"anonymousSessionByPk"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"anonymousSessionByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AnonymousSessionByPkQuery, AnonymousSessionByPkQueryVariables>;