import { NextApiRequest, NextApiResponse } from 'next';
import webpush, { PushSubscription } from 'web-push';

import { getAdminGqlClient } from '$/lib/admin-gql-client';
import { NotificationSubscriptionsByUserIdDocument } from '$/server/graphql/generated/notification';
import { badRequest } from '$/server/utilities/response';

const WEB_PUSH_OPTIONS: webpush.RequestOptions = {
  vapidDetails: {
    // TODO: update it with Chirpy official email
    subject: 'mailto:example@yourdomain.org',
    publicKey: process.env.NEXT_PUBLIC_VAPID,
    privateKey: process.env.PRIVATE_VAPID,
  },
  ...(process.env.PROXY && { proxy: process.env.PROXY }),
};
const client = getAdminGqlClient();
export async function sendNotification(req: NextApiRequest, res: NextApiResponse<{}>) {
  if (typeof req.query.userId !== 'string') {
    badRequest(res, 'Missing userId');
    return;
  }
  const { data } = await client
    .query(NotificationSubscriptionsByUserIdDocument, {
      userId: req.query.userId,
    })
    .toPromise();
  if (
    !data ||
    !Array.isArray(data?.notificationSubscriptions) ||
    data?.notificationSubscriptions.length === 0
  ) {
    badRequest(res, 'No subscriptions found');
    return;
  }
  const { notificationSubscriptions } = data;
  // console.log('sending notification', { data });
  await Promise.allSettled(
    notificationSubscriptions.map((subs: { subscription: PushSubscription }) =>
      webpush.sendNotification(subs.subscription, 'testing message', WEB_PUSH_OPTIONS),
    ),
  );

  res.end();
}
