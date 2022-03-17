import webpush from 'web-push';

import { getAdminGqlClient } from '$/lib/admin-gql-client';
import {
  DeleteNotificationSubscriptionByPkDocument,
  NotificationSubscriptionsByUserIdQuery,
} from '$/server/graphql/generated/notification';

import { NotificationPayload } from './send';
import { getWebNotificationPayload } from './utilities';

const client = getAdminGqlClient();

export function pushWebNotification(payload: NotificationPayload) {
  return async (
    sub: NotificationSubscriptionsByUserIdQuery['notificationSubscriptions'][number],
  ) => {
    try {
      await webpush.sendNotification(
        sub.subscription,
        JSON.stringify(getWebNotificationPayload(payload)),
        WEB_PUSH_OPTIONS,
      );
    } catch (error) {
      console.log('webpush error', JSON.stringify(error, null, 2));
      let err: any = error;
      if (
        err.statusCode === 410 ||
        err.statusCode === 404 ||
        err.code === 'ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY'
      ) {
        console.error('Subscription has expired or is no longer valid:', error);
        try {
          const resp = await client
            .mutation(DeleteNotificationSubscriptionByPkDocument, {
              id: sub.id,
            })
            .toPromise();
          console.log('Deleted subscription', resp);
        } catch (error) {
          console.log('Error deleting subscription', error);
        }
      }

      throw error;
    }
  };
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
