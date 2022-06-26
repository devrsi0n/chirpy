import * as React from 'react';

import {
  INotificationContext,
  NotificationContext,
} from '$/contexts/notification-context';
import { asyncNoop, noop } from '$/utilities/isomorphic/function';

export type PredefinedNotificationProps = {
  children: React.ReactNode;
};

/**
 * Provide predefined notification context
 * @param props
 * @returns
 */
export function PredefinedNotification(
  props: PredefinedNotificationProps,
): JSX.Element {
  const notificationContext: INotificationContext = React.useMemo(
    () => ({
      registerNotification: asyncNoop,
      didRegister: true,
      didDeny: false,
      setDidRegister: noop,
    }),
    [],
  );

  return (
    <NotificationContext.Provider value={notificationContext}>
      {props.children}
    </NotificationContext.Provider>
  );
}
