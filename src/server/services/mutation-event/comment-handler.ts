import { getAuthorByCommentId, getSiteOwnerByTriggeredCommentId } from '$/server/gql/comment';
import { getUserByPk } from '$/server/gql/user';

import { createOneNotificationMessage, deleteNotificationMessage } from '../../gql/notification';
import { NotificationPayload, sendNotification } from '../notification/send';
import { EventComment, EventPayload } from './event-type';
import { getTextFromRteDoc } from './utilities';

/**
 * Get notification payloads for a comment event.
 * @param eventBody
 */
export async function getCommentEventNotifications(eventBody: EventPayload): Promise<void> {
  if (!isEventComment(eventBody)) {
    return;
  }
  const notificationPayloads: (NotificationPayload & { contextId: string })[] = [];
  const { event } = eventBody;
  if (event.op === 'INSERT') {
    const commentId = event.data.new.id;
    const body = getTextFromRteDoc(event.data.new.content);

    const siteOwnerData = await getSiteOwnerByTriggeredCommentId(commentId);
    const ownerId = siteOwnerData.page.project.ownerId;
    if (!ownerId) {
      throw new Error(`Can't find the owner of the comment (${commentId})`);
    }
    const triggeredById = event.data.new.userId;
    const triggeredBy = {
      id: triggeredById,
      name: siteOwnerData.triggeredBy.name || '',
    };
    const url = siteOwnerData.page.url;
    if (ownerId !== triggeredById) {
      // Notify the owner of the site that a comment has been added
      notificationPayloads.push({
        recipientId: ownerId,
        type: 'ReceivedAComment',
        triggeredBy,
        url,
        body,
        contextId: commentId,
      });
    }

    const parentCommentId = event.data.new.parentId;
    if (parentCommentId) {
      // Notify the parent comment author that a reply has been added
      const parentData = await getAuthorByCommentId(parentCommentId);
      const recipientId = parentData.author.id;
      if (recipientId !== ownerId && recipientId !== triggeredById) {
        notificationPayloads.push({
          recipientId,
          type: 'ReceivedAReply',
          triggeredBy,
          url,
          body,
          contextId: commentId,
        });
      }
    }
  } else if (event.op === 'UPDATE') {
    const { old: oldComment, new: newComment } = event.data;
    if (!oldComment.deletedAt && newComment.deletedAt) {
      // Delete the existing notification sent to the owner of site
      const siteOwnerData = await getSiteOwnerByTriggeredCommentId(newComment.id);
      const ownerId = siteOwnerData.page.project.ownerId;
      if (!ownerId) {
        throw new Error(`Can't find the owner of the comment (${newComment.id})`);
      }
      const contextId = newComment.id;
      // Sync with `INSERT` logic
      if (ownerId !== newComment.userId) {
        await deleteNotificationMessage({
          triggeredById: newComment.userId,
          recipientId: ownerId,
          type: 'ReceivedAComment',
          contextId,
        });
      }
      // Delete the existing notification sent to the parent comment author
      if (newComment.parentId) {
        const parentData = await getAuthorByCommentId(newComment.parentId);
        const recipientId = parentData.author.id;
        if (recipientId !== newComment.userId && recipientId !== ownerId) {
          await deleteNotificationMessage({
            triggeredById: newComment.userId,
            recipientId,
            type: 'ReceivedAReply',
            contextId,
          });
        }
      }

      // Send the notification to the author of the comment that his comment has been deleted
      const triggeredById = event.session_variables['x-hasura-user-id'];
      const [authorData, triggeredBy] = await Promise.all([
        getAuthorByCommentId(newComment.id),
        getUserByPk(triggeredById),
      ]);
      const recipientId = authorData.author.id;
      if (recipientId !== triggeredById) {
        notificationPayloads.push({
          recipientId: authorData.author.id,
          triggeredBy: {
            id: triggeredById,
            name: triggeredBy.name || '',
          },
          type: 'CommentDeleted',
          url: authorData.page.url,
          body: getTextFromRteDoc(newComment.content),
          contextId,
        });
      }
    }
  }
  await Promise.allSettled(
    notificationPayloads.reduce((previous, { contextId, ...payload }) => {
      previous.push(
        createOneNotificationMessage({
          recipientId: payload.recipientId,
          type: payload.type,
          url: payload.url,
          triggeredById: payload.triggeredBy.id,
          contextId: contextId,
        }),
        sendNotification(payload),
      );
      return previous;
    }, [] as Promise<any>[]),
  );
  return;
}

function isEventComment(eventBody: EventPayload): eventBody is EventComment {
  const { table } = eventBody;
  return table.name === 'Comment';
}
