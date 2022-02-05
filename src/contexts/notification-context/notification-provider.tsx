import * as React from 'react';

import {
  askNotificationPermission,
  checkNotificationCompatibility,
  registerNotificationSubscription,
} from './utilities';

export interface INotificationContext {
  didRegister: boolean;
  setDidRegister: React.Dispatch<React.SetStateAction<boolean>>;
  registerNotification: () => Promise<void>;
}

const NotificationContext = React.createContext<INotificationContext>({
  didRegister: false,
  setDidRegister: () => {},
  registerNotification: () => Promise.resolve(),
});

export interface INotificationProviderProps {
  children: React.ReactNode;
}

export function NotificationProvider({ children }: INotificationProviderProps) {
  const [didRegister, setDidRegister] = React.useState(false);
  const registerNotification = React.useCallback(async (): Promise<void> => {
    if (Notification.permission === 'denied') {
      return console.log('Notification permission denied');
    } else if (Notification.permission === 'default') {
      const permission = await askNotificationPermission();
      if (permission === 'denied' || permission === 'default') {
        return console.log(`User didn't grant notification permission`);
      }
    }

    // We don't want to wait here for registering the service worker, we only need to wait for permission check
    registerNotificationSubscription().then(() => setDidRegister(true));
  }, []);
  const value = React.useMemo(
    () => ({
      didRegister,
      setDidRegister,
      registerNotification,
    }),
    [didRegister, registerNotification],
  );
  React.useEffect(() => {
    checkNotificationCompatibility();
    // Register the service worker on first load
    if (!didRegister && Notification.permission === 'granted') {
      // Only register once in whole page
      registerNotificationSubscription().then(() => setDidRegister(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotificationContext() {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationContext');
  }
  return context;
}
