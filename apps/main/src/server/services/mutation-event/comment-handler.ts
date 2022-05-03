import { NextApiResponse } from 'next';

import { gqlQuery } from '$/server/common/gql';
import { SiteOwnerByTriggerCommentIdDocument } from '@chirpy/server-graphql/generated/comment';
import { revalidateCommentWidget } from '$/server/utilities/revalidate';

import { sendNotification } from '../notification/send';
import { NotificationPayload } from '@chirpy/types';
import { EventComment, EventPayload } from './event-type';
import {
  createOneNotificationMessage,
  deleteNotificationMessage,
  getAuthorByCommentId,
  getTextFromRteDoc,
  getUserByPk,
} from './utilities';

/**
 * Handle hasura comment event, send web notification, trigger revalidation of the comment page.
 * @param eventBody
 */
export async function handleCommentEvent(
  eventBody: EventPayload,
  res: NextApiResponse,
): Promise<void> {
  if (!isEventComment(eventBody)) {
    return;
  }
  const promises = [];
  const notificationPayloads: (NotificationPayload & { contextId: string })[] = [];
  const { event } = eventBody;
  if (event.op === 'INSERT') {
    const commentId = event.data.new.id;
    const body = getTextFromRteDoc(event.data.new.content);

    const siteOwnerData = await getSiteOwnerByTriggeredCommentId(commentId);
    const url = siteOwnerData.page.url;
    promises.push(revalidateCommentWidget(url, res));

    const owner = siteOwnerData.page.project.owner;
    if (!owner?.id) {
      throw new Error(`Can't find the owner of the comment (${commentId})`);
    }
    const ownerId = owner.id;
    const triggeredById = event.data.new.userId;
    const triggeredBy = {
      id: triggeredById,
      name: siteOwnerData.triggeredBy.name || siteOwnerData.triggeredBy.username || 'Unnamed',
    };
    if (owner.id !== triggeredById) {
      // Notify the owner of the site that a comment has been added
      notificationPayloads.push({
        recipient: {
          id: ownerId,
          email: owner.email,
          name: owner.name || owner.username || 'Unnamed',
        },
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
          recipient: {
            id: recipientId,
            email: parentData.author.email,
            name: parentData.author.name || parentData.author.username || 'Unnamed',
          },
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
      const ownerId = siteOwnerData.page.project.owner?.id;
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
      const { url } = authorData.page;
      promises.push(revalidateCommentWidget(url, res));

      const recipientId = authorData.author.id;
      if (recipientId !== triggeredById) {
        notificationPayloads.push({
          recipient: {
            id: recipientId,
            email: authorData.author.email,
            name: authorData.author.name || authorData.author.username || 'Unnamed',
          },
          triggeredBy: {
            id: triggeredById,
            name: triggeredBy.name || '',
          },
          type: 'CommentDeleted',
          url,
          body: getTextFromRteDoc(newComment.content),
          contextId,
        });
      }
    }
  }
  await Promise.allSettled([
    ...promises,
    ...notificationPayloads.reduce((previous, { contextId, ...payload }) => {
      previous.push(
        createOneNotificationMessage({
          recipientId: payload.recipient.id,
          type: payload.type,
          url: payload.url,
          triggeredById: payload.triggeredBy.id,
          contextId,
          content: payload.body,
        }),
        sendNotification(payload),
      );
      return previous;
    }, [] as Promise<any>[]),
  ]);
  return;
}

export async function getSiteOwnerByTriggeredCommentId(commentId: string) {
  return gqlQuery(
    SiteOwnerByTriggerCommentIdDocument,
    {
      commentId,
    },
    'commentByPk',
  );
}

function isEventComment(eventBody: EventPayload): eventBody is EventComment {
  const { table } = eventBody;
  return table.name === 'Comment';
}
