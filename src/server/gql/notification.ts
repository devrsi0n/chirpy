import { getAdminGqlClient } from '$/lib/admin-gql-client';
import {
  DeleteNotificationMessageDocument,
  DeleteNotificationMessageMutationVariables,
  InsertOneNotificationMessageDocument,
  InsertOneNotificationMessageMutationVariables,
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
  const { data: deleteMessageData, error } = await client
    .mutation(DeleteNotificationMessageDocument, variables)
    .toPromise();
  if (error || !deleteMessageData?.deleteNotificationMessages?.affected_rows) {
    throw new Error(
      `Can't delete the notification message for the contextId (${variables.contextId}), error: ${error}`,
    );
  }
}
