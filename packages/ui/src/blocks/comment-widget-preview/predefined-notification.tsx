import * as React from 'react';

import {
  INotificationContext,
  NotificationContext,
} from '../../contexts/notification-context';
import { asyncNoop, noop } from '@chirpy-dev/utils';

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
      didRegister: false,
      didDeny: false,
      setDidRegister: noop,
      supportNotification: false,
    }),
    [],
  );

  return (
    <NotificationContext.Provider value={notificationContext}>
      {props.children}
    </NotificationContext.Provider>
  );
}
