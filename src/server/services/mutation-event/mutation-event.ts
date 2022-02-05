import { JSONContent } from '@tiptap/react';
import { NextApiRequest, NextApiResponse } from 'next';

import { getAdminGqlClient } from '$/lib/admin-gql-client';

import {
  AuthorByCommentIdDocument,
  SiteOwnerByCommentIdDocument,
} from '../../graphql/generated/comment';
import { InsertOneNotificationMessageDocument } from '../../graphql/generated/notification-message';
import { unauthorized } from '../../utilities/response';
import { NotificationPayload, sendNotification } from '../notification/send';
import { EventPayload } from './event-type';

const client = getAdminGqlClient();

/**
 * Handle mutation event trigger by hasura. Send notifications and emails to subscribers.
 */
export async function handleMutationEvent(req: NextApiRequest, res: NextApiResponse<{}>) {
  if (req.headers['hasura_event_secret'] !== process.env.HASURA_EVENT_SECRET) {
    return unauthorized(res);
  }
  const payload = req.body as EventPayload;
  const { event, table } = payload;

  if (event.op === 'INSERT' && table.name === 'Comment') {
    const commentId = event.data.new.id;
    const payloads: NotificationPayload[] = [];
    const body = getTextFromRteDoc(event.data.new.content);

    const { data: siteOwnerData } = await client
      .query(SiteOwnerByCommentIdDocument, {
        commentId,
      })
      .toPromise();
    const ownerId = siteOwnerData?.commentByPk?.page.project.userId;
    if (!siteOwnerData?.commentByPk || !ownerId) {
      throw new Error(`Can't find the owner of the comment (${commentId})`);
    }

    const triggeredById = event.data.new.userId;
    const triggeredBy = {
      id: siteOwnerData.commentByPk.user.id,
      name: siteOwnerData.commentByPk.user.name || '',
    };
    const url = siteOwnerData.commentByPk.page.url;
    if (ownerId !== triggeredById) {
      // Notify the owner of the site that a comment has been added
      payloads.push({
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
      const { data: parentData } = await client
        .query(AuthorByCommentIdDocument, {
          commentId: parentCommentId,
        })
        .toPromise();
      if (parentData?.commentByPk && parentData?.commentByPk?.user.id !== ownerId) {
        const author = parentData.commentByPk.user;
        payloads.push({
          recipientId: author.id,
          type: 'ReceivedAReply',
          triggeredBy,
          url,
          body,
        });
      }
    }

    await Promise.all(
      payloads.reduce((previous, payload) => {
        previous.push(
          client
            .mutation(InsertOneNotificationMessageDocument, {
              ...payload,
              triggeredById,
            })
            .toPromise(),
          sendNotification(payload),
        );
        return previous;
      }, [] as Promise<any>[]),
    );
  }
  res.end();
}

function getTextFromRteDoc(doc: JSONContent): string {
  let text = '';
  const stack: JSONContent[] = [doc];
  while (stack.length > 0) {
    const node = stack.pop()!;
    if (node.whiteSpace) {
      text += ' ';
    }
    text += node.text || '';
    if (node?.content) {
      node.content[node.content.length - 1].whiteSpace = true;
      for (let i = node.content.length - 1; i >= 0; i--) {
        stack.push(node.content[i]);
      }
    }
  }
  return text.replace(/\s{2,}/g, ' ').trim();
}
