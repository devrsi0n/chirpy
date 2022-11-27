import { getPublicEnvVar } from '@chirpy-dev/utils';
import * as React from 'react';

import { logger } from '../../utilities';
import { trpcClient } from '../../utilities/trpc-client';
import {
  checkServiceWorkerCompatibility,
  urlBase64ToUint8Array,
} from './utilities';

export type RegisterNotificationSubscription = () => Promise<void>;

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
      let subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        // Already registered
        return;
      }
      const vapidKey = urlBase64ToUint8Array(
        getPublicEnvVar('NEXT_PUBLIC_VAPID', process.env.NEXT_PUBLIC_VAPID),
      );
      subscription = await registration.pushManager.subscribe({
        // This means all push events will result in a notification
        userVisibleOnly: true,
        applicationServerKey: vapidKey,
      });

      try {
        // Save the subscription details to server
        await registerDevice({
          subscription: subscription,
        });
      } catch (error) {
        logger.warn('Register notification subscription failed', error);
      }
    } catch (error) {
      logger.error('Service worker registration failed', error);
      throw error;
    }
  }, [registerDevice]);
}
