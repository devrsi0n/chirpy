import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import webpush, { PushSubscription } from 'web-push';

import { getAdminGqlClient } from '$/lib/admin-gql-client';

import {
  InsertOneNotificationSubscriptionDocument,
  InsertOneNotificationSubscriptionMutation,
  InsertOneNotificationSubscriptionMutationVariables,
  NotificationSubscriptionsByUserIdDocument,
} from '../graphql/generated/notification';
import { badRequest, unauthorized } from '../utilities/response';
import { isValidHttpUrl } from '../utilities/url';

const client = getAdminGqlClient();

export async function registerDevice(req: NextApiRequest, res: NextApiResponse<{}>) {
  const session = await getSession({ req });
  if (!session?.user.id) {
    unauthorized(res);
    return;
  }
  const { subscription }: { subscription: PushSubscription } = req.body;
  if (!isValidSubscription(subscription)) {
    badRequest(res, 'Invalid subscription');
    return;
  }
  // console.log('saving subscription', subscription);
  await client
    .mutation<
      InsertOneNotificationSubscriptionMutation,
      InsertOneNotificationSubscriptionMutationVariables
    >(InsertOneNotificationSubscriptionDocument, {
      userId: session.user.id,
      subscription,
    })
    .toPromise();
  res.json({
    message: 'ok',
  });
  res.end();
}

const WEB_PUSH_OPTIONS: webpush.RequestOptions = {
  vapidDetails: {
    // TODO: update it with Chirpy official email
    subject: 'mailto:example@yourdomain.org',
    publicKey: process.env.NEXT_PUBLIC_VAPID,
    privateKey: process.env.PRIVATE_VAPID,
  },
  ...(process.env.PROXY && { proxy: process.env.PROXY }),
};

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
    notificationSubscriptions.map((subs) =>
      webpush.sendNotification(subs.subscription, 'testing message', WEB_PUSH_OPTIONS),
    ),
  );

  res.end();
}

function isValidSubscription(subscription: PushSubscription) {
  return (
    isValidHttpUrl(subscription.endpoint) &&
    subscription.keys.p256dh &&
    subscription.keys.auth &&
    subscription.keys.p256dh.length > 0 &&
    subscription.keys.auth.length > 0
  );
}
