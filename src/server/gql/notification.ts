import { getAdminGqlClient } from '$/lib/admin-gql-client';
import {
  DeleteNotificationMessageDocument,
  DeleteNotificationMessageMutationVariables,
  InsertOneNotificationMessageDocument,
  InsertOneNotificationMessageMutationVariables,
} from '$/server/graphql/generated/notification';
import {
  InsertOneNotificationSubscriptionDocument,
  InsertOneNotificationSubscriptionMutation,
  InsertOneNotificationSubscriptionMutationVariables,
} from '$/server/graphql/generated/notification';

const client = getAdminGqlClient();

export async function createOneNotificationMessage(
  variables: InsertOneNotificationMessageMutationVariables,
) {
  const { data, error } = await client
    .mutation(InsertOneNotificationMessageDocument, variables)
    .toPromise();
  if (!data?.insertOneNotificationMessage?.id || error) {
    throw new Error(
      `Can't create a notification message for the contextId (${variables.contextId}), error: ${error}`,
    );
  }
  return data.insertOneNotificationMessage;
}

export async function deleteNotificationMessage(
  variables: DeleteNotificationMessageMutationVariables,
) {
  const result = await client.mutation(DeleteNotificationMessageDocument, variables).toPromise();
  const { data, error } = result;
  if (error || !data?.deleteNotificationMessages?.affected_rows) {
    throw new Error(
      `Can't delete the notification message for the contextId (${variables.contextId}), error: ${error}`,
    );
  }
  return data.deleteNotificationMessages;
}

export async function createOneNotificationSubscription(
  variables: InsertOneNotificationSubscriptionMutationVariables,
) {
  const { error, data } = await client
    .mutation(InsertOneNotificationSubscriptionDocument, variables)
    .toPromise();
  // It's ok if there're a duplicated, just ignore it
  if (error && !error.message.startsWith('[GraphQL] Uniqueness violation')) {
    throw new Error(`Create a notification subscription failed), error: ${error}`);
  }
  return data?.insertOneNotificationSubscription;
}
