import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PushSubscription } from 'web-push';

import { getAdminGqlClient } from '$/lib/admin-gql-client';

import {
  InsertOneNotificationSubscriptionDocument,
  InsertOneNotificationSubscriptionMutation,
  InsertOneNotificationSubscriptionMutationVariables,
} from '../../graphql/generated/notification';
import { badRequest, unauthorized } from '../../utilities/response';
import { isValidHttpUrl } from '../../utilities/url';

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

function isValidSubscription(subscription: PushSubscription) {
  return (
    isValidHttpUrl(subscription.endpoint) &&
    subscription.keys.p256dh &&
    subscription.keys.auth &&
    subscription.keys.p256dh.length > 0 &&
    subscription.keys.auth.length > 0
  );
}
