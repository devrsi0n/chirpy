import * as Types from './types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type InsertOneEventMutationVariables = Types.Exact<{
  type?: Types.Maybe<Types.Scalars['String']>;
  params?: Types.Maybe<Types.Scalars['jsonb']>;
  url?: Types.Maybe<Types.Scalars['String']>;
  referrer?: Types.Maybe<Types.Scalars['String']>;
  sessionId?: Types.Maybe<Types.Scalars['uuid']>;
}>;


export type InsertOneEventMutation = (
  { __typename?: 'mutation_root' }
  & { insertOneEvent?: Types.Maybe<(
    { __typename?: 'Event' }
    & Pick<Types.Event, 'id'>
  )> }
);


export const InsertOneEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"insertOneEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"jsonb"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"referrer"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertOneEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"referrer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"referrer"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"sessionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<InsertOneEventMutation, InsertOneEventMutationVariables>;