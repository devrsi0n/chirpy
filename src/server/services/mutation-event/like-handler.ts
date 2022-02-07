import { getAdminGqlClient } from '$/lib/admin-gql-client';
import { getAuthorByCommentId } from '$/server/gql/comment';
import { getRecipientByLikeId } from '$/server/gql/like';

import { createOneNotificationMessage, deleteNotificationMessage } from '../../gql/notification';
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

    await createOneNotificationMessage({
      recipientId: recipient.id,
      type: 'ReceivedALike',
      triggeredById: triggerById,
      url: recipientData.comment.page.url,
      contextId: like.id,
    });
  } else if (event.op === 'DELETE') {
    const likeId = event.data.old.id;
    const authorData = await getAuthorByCommentId(event.data.old.commentId);
    await deleteNotificationMessage({
      recipientId: authorData.author.id,
      triggeredById: event.data.old.userId,
      type: 'ReceivedALike',
      contextId: likeId,
      url: authorData.page.url,
    });
  }
  return;
}

function isEventLike(eventBody: EventPayload): eventBody is EventLike {
  const { table } = eventBody;
  return table.name === 'Like';
}
