import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PushSubscription } from 'web-push';

import { gqlMutate } from '$/server/common/gql';
import {
  InsertOneNotificationSubscriptionDocument,
  InsertOneNotificationSubscriptionMutationVariables,
} from '$/server/graphql/generated/notification';

import { badRequest, unauthorized } from '../../utilities/response';
import { isValidHttpUrl } from '../../utilities/url';

export async function registerDevice(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, unknown>>,
) {
  const session = await getSession({ req });
  if (!session?.user?.id) {
    unauthorized(res);
    return;
  }
  const { subscription }: { subscription: PushSubscription } = req.body;
  if (!isValidSubscription(subscription)) {
    badRequest(res, 'Invalid subscription');
    return;
  }
  try {
    await createOneNotificationSubscription({
      userId: session.user.id,
      subscription,
    });
  } catch (error) {
    // Ignore duplicated registration
    if (!(error as Error).message.includes('Uniqueness violation')) {
      throw error;
    }
  }
  res.json({
    message: 'ok',
  });
  res.end();
}

function createOneNotificationSubscription(
  variables: InsertOneNotificationSubscriptionMutationVariables,
) {
  return gqlMutate(
    InsertOneNotificationSubscriptionDocument,
    variables,
    'insertOneNotificationSubscription',
  );
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
