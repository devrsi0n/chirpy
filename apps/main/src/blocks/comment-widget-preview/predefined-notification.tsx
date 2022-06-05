import * as React from 'react';

import { INotificationContext, NotificationContext } from '$/contexts/notification-context';
import { asyncNoop, noop } from '$/utilities/isomorphic/function';

export type PredefinedNotificationProps = {
  children: React.ReactNode;
};

/**
 * Provide existing or mocked notification context
 * @param props
 * @returns
 */
export function PredefinedNotification(props: PredefinedNotificationProps): JSX.Element {
  const originalContext = React.useContext(NotificationContext);
  const notificationContext: INotificationContext = React.useMemo(() => {
    if (originalContext) {
      return originalContext;
    }
    return {
      registerNotification: asyncNoop,
      didRegister: true,
      didDeny: false,
      setDidRegister: noop,
    };
  }, [originalContext]);
  return (
    <NotificationContext.Provider value={notificationContext}>
      {props.children}
    </NotificationContext.Provider>
  );
}
