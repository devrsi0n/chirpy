import * as Types from './types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type InsertOneNotificationSubscriptionMutationVariables = Types.Exact<{
  userId: Types.Scalars['uuid'];
  subscription: Types.Scalars['jsonb'];
}>;


export type InsertOneNotificationSubscriptionMutation = { __typename?: 'mutation_root', insertOneNotificationSubscription?: { __typename?: 'NotificationSubscription', id: string } | null | undefined };

export type NotificationSubscriptionsByUserIdQueryVariables = Types.Exact<{
  userId: Types.Scalars['uuid'];
}>;


export type NotificationSubscriptionsByUserIdQuery = { __typename?: 'query_root', notificationSubscriptions: Array<{ __typename?: 'NotificationSubscription', id: string, subscription: any }> };

export type DeleteNotificationSubscriptionByPkMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;


export type DeleteNotificationSubscriptionByPkMutation = { __typename?: 'mutation_root', deleteNotificationSubscriptionByPk?: { __typename?: 'NotificationSubscription', id: string } | null | undefined };

export type InsertOneNotificationMessageMutationVariables = Types.Exact<{
  recipientId: Types.Scalars['uuid'];
  type: Types.NotificationType_Enum;
  triggeredById?: Types.InputMaybe<Types.Scalars['uuid']>;
  url?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type InsertOneNotificationMessageMutation = { __typename?: 'mutation_root', insertOneNotificationMessage?: { __typename?: 'NotificationMessage', id: string } | null | undefined };


export const InsertOneNotificationSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"insertOneNotificationSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subscription"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"jsonb"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertOneNotificationSubscription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"subscription"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subscription"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<InsertOneNotificationSubscriptionMutation, InsertOneNotificationSubscriptionMutationVariables>;
export const NotificationSubscriptionsByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"notificationSubscriptionsByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notificationSubscriptions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subscription"}}]}}]}}]} as unknown as DocumentNode<NotificationSubscriptionsByUserIdQuery, NotificationSubscriptionsByUserIdQueryVariables>;
export const DeleteNotificationSubscriptionByPkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteNotificationSubscriptionByPk"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteNotificationSubscriptionByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteNotificationSubscriptionByPkMutation, DeleteNotificationSubscriptionByPkMutationVariables>;
export const InsertOneNotificationMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"insertOneNotificationMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recipientId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationType_enum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"triggeredById"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertOneNotificationMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"recipientId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recipientId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"triggeredById"},"value":{"kind":"Variable","name":{"kind":"Name","value":"triggeredById"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<InsertOneNotificationMessageMutation, InsertOneNotificationMessageMutationVariables>;