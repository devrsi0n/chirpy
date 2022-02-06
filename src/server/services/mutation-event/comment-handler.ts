import { getAdminGqlClient } from '$/lib/admin-gql-client';

import { SiteOwnerByTriggerCommentIdDocument } from '../../graphql/generated/comment';
import { InsertOneNotificationMessageDocument } from '../../graphql/generated/notification';
import { NotificationPayload, sendNotification } from '../notification/send';
import { EventComment, EventPayload } from './event-type';
import { getAuthorByCommentId, getTextFromRteDoc } from './utilities';

const client = getAdminGqlClient();

/**
 * Get notification payloads for a comment event.
 * @param eventBody
 */
export async function getCommentEventNotifications(eventBody: EventPayload): Promise<void> {
  if (!isEventComment(eventBody)) {
    return;
  }
  const { event } = eventBody;
  if (event.op === 'INSERT') {
    const commentId = event.data.new.id;
    const body = getTextFromRteDoc(event.data.new.content);
    const notificationPayloads: NotificationPayload[] = [];

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
        });
      }
    }

    await Promise.allSettled(
      notificationPayloads.reduce((previous, payload) => {
        previous.push(
          client
            .mutation(InsertOneNotificationMessageDocument, {
              ...payload,
              triggeredById,
              contextId: commentId,
            })
            .toPromise(),
          sendNotification(payload),
        );
        return previous;
      }, [] as Promise<any>[]),
    );
  }
  // TODO: Delete the notification message if the comment deleted
  return;
}

function isEventComment(eventBody: EventPayload): eventBody is EventComment {
  const { table } = eventBody;
  return table.name === 'Comment';
}
