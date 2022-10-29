import { asyncNoop, noop } from '@chirpy-dev/utils';
import * as React from 'react';

import { logger } from '../../utilities/logger';
import { useCurrentUser } from '../current-user-context';
import { useReloadWhenSwChange } from './use-reload-when-sw-change';
import {
  askNotificationPermission,
  checkNotificationCompatibility,
  registerNotificationSubscription,
} from './utilities';

export interface INotificationContext {
  didRegister: boolean;
  setDidRegister: React.Dispatch<React.SetStateAction<boolean>>;
  registerNotification: () => Promise<void>;
  didDeny: boolean;
  supportNotification: boolean;
}

export const NotificationContext = React.createContext<INotificationContext>({
  didRegister: false,
  setDidRegister: noop,
  registerNotification: asyncNoop,
  didDeny: false,
  supportNotification: false,
});

export interface INotificationProviderProps {
  children: React.ReactNode;
}

export function NotificationProvider({ children }: INotificationProviderProps) {
  const [didRegister, setDidRegister] = React.useState(false);
  const [didDeny, setDidDeny] = React.useState(false);
  const [supportNotification, setSupportNotification] = React.useState(false);
  React.useEffect(() => {
    if (checkNotificationCompatibility()) {
      setSupportNotification(true);
    }
  }, []);

  const { isSignIn } = useCurrentUser();
  const registerNotification = React.useCallback(async (): Promise<void> => {
    if (!isSignIn) {
      return;
    }
    if (Notification.permission === 'denied') {
      return logger.debug('Notification permission denied');
    } else if (Notification.permission === 'default') {
      const permission = await askNotificationPermission();
      if (permission === 'denied') {
        setDidDeny(true);
      }
      if (permission === 'denied' || permission === 'default') {
        return logger.debug(`User didn't grant notification permission`);
      }
    }

    // We don't want to wait here for registering the service worker, we only need to wait for permission check
    registerNotificationSubscription().then(() => setDidRegister(true));
  }, [isSignIn]);
  const value = React.useMemo(
    () => ({
      didRegister,
      setDidRegister,
      registerNotification,
      didDeny,
      supportNotification,
    }),
    [didRegister, registerNotification, didDeny, supportNotification],
  );
  React.useEffect(() => {
    if (!checkNotificationCompatibility()) {
      return;
    }
    // Register the service worker on first load
    if (!didRegister && Notification.permission === 'granted') {
      // Only register once on whole page
      registerNotificationSubscription().then(() => setDidRegister(true));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useReloadWhenSwChange();

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotificationContext must be used within a NotificationContext',
    );
  }
  return context;
}
