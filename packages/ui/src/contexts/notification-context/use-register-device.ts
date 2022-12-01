import { getPublicEnvVar } from '@chirpy-dev/utils';
import * as React from 'react';

import { logger } from '../../utilities';
import { trpcClient } from '../../utilities/trpc-client';
import {
  checkServiceWorkerCompatibility,
  urlBase64ToUint8Array,
} from './utilities';

export type RegisterNotificationSubscription = () => Promise<void>;
const NOTIFICATION_DID_REGISTER_KEY =
  'chirpy.notification-subscription.did-register';
export function useRegisterNotificationSubscription(): RegisterNotificationSubscription {
  const { mutateAsync: registerDevice } =
    trpcClient.notification.register.useMutation();

  // It's safe to register the service worker multiply times
  return React.useCallback(async () => {
    if (!checkServiceWorkerCompatibility()) {
      throw new Error(`Service worker not supported`);
    }
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      if (!registration?.pushManager) {
        // Not supported
        return;
      }
      if (sessionStorage.getItem(NOTIFICATION_DID_REGISTER_KEY) === 'true') {
        return;
      }
      const vapidKey = urlBase64ToUint8Array(
        getPublicEnvVar('NEXT_PUBLIC_VAPID', process.env.NEXT_PUBLIC_VAPID),
      );
      const subscription = await registration.pushManager.subscribe({
        // This means all push events will result in a notification
        userVisibleOnly: true,
        applicationServerKey: vapidKey,
      });

      try {
        // Save the subscription details to server
        await registerDevice({
          subscription,
        });
        sessionStorage.setItem(NOTIFICATION_DID_REGISTER_KEY, 'true');
      } catch (error) {
        sessionStorage.removeItem(NOTIFICATION_DID_REGISTER_KEY);
        logger.warn('Register notification subscription failed', error);
      }
    } catch (error) {
      logger.error('Service worker registration failed', error);
      throw error;
    }
  }, [registerDevice]);
}
