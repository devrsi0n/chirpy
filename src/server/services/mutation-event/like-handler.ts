import { getAdminGqlClient } from '$/lib/admin-gql-client';
import { RecipientByLikeIdDocument } from '$/server/graphql/generated/like';
import {
  DeleteNotificationMessageDocument,
  InsertOneNotificationMessageDocument,
} from '$/server/graphql/generated/notification';

import { EventLike, EventPayload } from './event-type';

const client = getAdminGqlClient();

/**
 * Get notification payloads for a like event.
 * Only create a passive notification message (it's a low priority message),
 * we may send a web push only if user enables it manually.
 * @param eventBody
 */
export async function getLikeEventNotifications(eventBody: EventPayload): Promise<void> {
  // console.log(JSON.stringify(eventBody, null, 2));
  if (!isEventLike(eventBody)) {
    return;
  }
  const { event } = eventBody;
  if (event.op === 'INSERT') {
    const like = event.data.new;
    const recipientData = await getRecipientByLikeId(like.id);
    const recipient = recipientData.comment.recipient;
    const triggerById = like.userId;

    const { data: insertMessageData, error } = await client
      .mutation(InsertOneNotificationMessageDocument, {
        recipientId: recipient.id,
        type: 'ReceivedALike',
        triggeredById: triggerById,
        url: recipientData.comment.page.url,
        contextId: like.id,
      })
      .toPromise();
    if (error) {
      throw new Error(`Can't create a notification message for the like (${like.id})`);
    }
    if (!insertMessageData?.insertOneNotificationMessage?.id) {
      throw new Error(`Can't create the notification message for the like (${like.id})`);
    }
  } else if (event.op === 'DELETE') {
    // Delete the message
    const likeId = event.data.old.id;
    // TODO: Find the recipient via user query since the like was deleted
    const recipientData = await getRecipientByLikeId(likeId);
    const { data: deleteMessageData, error } = await client
      .mutation(DeleteNotificationMessageDocument, {
        recipientId: recipientData.comment.recipient.id,
        triggeredById: recipientData.triggeredBy.id,
        type: 'ReceivedALike',
        contextId: likeId,
        url: recipientData.comment.page.url,
      })
      .toPromise();
    if (error) {
      throw new Error(`Can't create a notification message for the like (${likeId})`);
    }
    if (!deleteMessageData?.deleteNotificationMessages?.affected_rows) {
      throw new Error(`Can't delete the notification message for the like (${likeId})`);
    }
  }
  return;
}

async function getRecipientByLikeId(likeId: string) {
  const { data } = await client
    .query(RecipientByLikeIdDocument, {
      likeId: likeId,
    })
    .toPromise();
  if (!data?.likeByPk?.comment) {
    throw new Error(`Can't find the comment of the like (${likeId})`);
  }
  return data.likeByPk;
}

function isEventLike(eventBody: EventPayload): eventBody is EventLike {
  const { table } = eventBody;
  return table.name === 'Like';
}
