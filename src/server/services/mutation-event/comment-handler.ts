import { getAdminGqlClient } from '$/lib/admin-gql-client';
import { getAuthorByCommentId } from '$/server/gql/comment';
import { getUserByPk } from '$/server/gql/user';

import { createOneNotificationMessage } from '../../gql/notification';
import { SiteOwnerByTriggerCommentIdDocument } from '../../graphql/generated/comment';
import { NotificationPayload, sendNotification } from '../notification/send';
import { EventComment, EventPayload } from './event-type';
import { getTextFromRteDoc } from './utilities';

const client = getAdminGqlClient();

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

    const { data: siteOwnerData } = await client
      .query(SiteOwnerByTriggerCommentIdDocument, {
        commentId,
      })
      .toPromise();
    const ownerId = siteOwnerData?.commentByPk?.page.project.ownerId;
    if (!siteOwnerData?.commentByPk || !ownerId) {
      throw new Error(`Can't find the owner of the comment (${commentId})`);
    }

    const triggeredById = event.data.new.userId;
    const triggeredBy = {
      id: triggeredById,
      name: siteOwnerData.commentByPk.triggeredBy.name || '',
    };
    const url = siteOwnerData.commentByPk.page.url;
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
    if (parentCommentId && parentCommentId !== triggeredById && parentCommentId !== ownerId) {
      // Notify the parent comment author that a reply has been added
      const parentData = await getAuthorByCommentId(parentCommentId);
      if (parentData.author.id !== ownerId) {
        notificationPayloads.push({
          recipientId: parentData.author.id,
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
      // Delete the existing notification
      const triggeredById = event.session_variables['x-hasura-user-id'];
      const [authorData, triggeredBy] = await Promise.all([
        getAuthorByCommentId(newComment.id),
        getUserByPk(triggeredById),
      ]);
      notificationPayloads.push({
        recipientId: authorData.author.id,
        triggeredBy: {
          id: triggeredById,
          name: triggeredBy.name || '',
        },
        type: 'CommentDeleted',
        url: authorData.page.url,
        body: getTextFromRteDoc(newComment.content),
        contextId: newComment.id,
      });
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
