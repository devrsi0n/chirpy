import { NextApiRequest, NextApiResponse } from 'next';

import { getAdminGqlClient } from '$/lib/admin-gql-client';

import { SiteOwnerByCommentIdDocument } from '../graphql/generated/comment';
import { InsertOneNotificationMessageDocument } from '../graphql/generated/notification-message';
import { NotificationPayload, sendNotification } from './notification/send';

const client = getAdminGqlClient();

/**
 * Handle mutation event trigger by hasura. Send notifications and emails to subscribers.
 */
export async function handleMutationEvent(req: NextApiRequest, res: NextApiResponse<{}>) {
  // console.log('handleMutationEvent body', JSON.stringify(req.body, null, 2));
  const payload = req.body as EventPayload;
  const { event, table } = payload;

  if (event.op === 'INSERT' && table.name === 'Comment') {
    // Notify the owner of the site that a comment has been added.
    const commentId = event.data.new.id;

    const { data } = await client
      .query(SiteOwnerByCommentIdDocument, {
        commentId,
      })
      .toPromise();
    if (!data || !data.commentByPk) {
      throw new Error('No site owner found');
    }
    const ownerId = data.commentByPk.page.project.userId;
    if (!ownerId) {
      throw new Error(`Can't find the owner of the comment (${commentId})`);
    }
    const payload: NotificationPayload = {
      recipientId: ownerId,
      type: 'ReceivedAComment',
      triggeredById: event.data.new.userId,
      triggeredBy: {
        ...data.commentByPk.user,
        name: data.commentByPk.user.name!,
      },
      url: data.commentByPk?.page.url,
    };
    await Promise.all([
      client.mutation(InsertOneNotificationMessageDocument, payload).toPromise(),
      sendNotification(payload),
    ]);
  }
  res.end();
}

/**
 * Example:
 * {
  "event": {
    "session_variables": {
      "x-hasura-role": "user",
      "x-hasura-user-id": "057eb503-75ad-4d2f-be3a-9d9675734d47"
    },
    "op": "INSERT",
    "data": {
      "old": null,
      "new": {
        "createdAt": "2022-01-30T08:30:27.331922+00:00",
        "pageId": "1d6bfbbe-e45b-45ae-983b-d2b7f33666b2",
        "content": {
          "content": [
            {
              "content": [
                {
                  "text": "test",
                  "type": "text"
                }
              ],
              "type": "paragraph"
            }
          ],
          "type": "doc"
        },
        "userId": "057eb503-75ad-4d2f-be3a-9d9675734d47",
        "id": "c94f9fb0-bd57-43d0-94a2-b3e666669bf0",
        "updatedAt": "2022-01-30T08:30:27.331922+00:00",
        "deletedAt": null,
        "parentId": null
      }
    },
    "trace_context": {
      "trace_id": "f444fa6bbd17e365",
      "span_id": "6dd0dade4563f7c8"
    }
  },
  "created_at": "2022-01-30T08:30:27.331922Z",
  "id": "05302df1-11cb-46f9-a885-48bf175acd98",
  "delivery_info": {
    "max_retries": 3,
    "current_retry": 0
  },
  "trigger": {
    "name": "Comment"
  },
  "table": {
    "schema": "public",
    "name": "Comment"
  }
}
 */
type EventPayload = {
  event: {
    session_variables: {
      'x-hasura-role': string;
      'x-hasura-user-id': string;
    };
    op: 'INSERT';
    data: {
      old: any;
      new: {
        createdAt: string;
        pageId: string;
        content: {
          content: Array<{
            content: Array<{
              text: string;
              type: string;
            }>;
            type: string;
          }>;
          type: string;
        };
        userId: string;
        id: string;
        updatedAt: string;
        deletedAt: any;
        parentId: any;
      };
    };
    trace_context: {
      trace_id: string;
      span_id: string;
    };
  };
  created_at: string;
  id: string;
  delivery_info: {
    max_retries: number;
    current_retry: number;
  };
  trigger: {
    name: 'Comment';
  };
  table: {
    schema: 'public';
    name: 'Comment';
  };
};
