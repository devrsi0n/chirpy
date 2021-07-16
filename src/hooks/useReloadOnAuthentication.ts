import * as React from 'react';

import { LOG_IN_SUCCESS_KEY, LOG_OUT_SUCCESS_KEY } from '$/lib/constants';
import { AuthenticationMessage } from '$/types/authentication.type';

import { useMessageListener } from './useMessageListener';
import { useStorageListener } from './useStorageListener';

export function useReloadOnAuthentication(): void {
  const handleAuthentication = React.useCallback(
    (key: string | null, newValue: string | null): void => {
      if (!newValue?.length) {
        return;
      }

      if (LOG_IN_SUCCESS_KEY === key && newValue !== location.pathname) {
        window.localStorage.setItem(LOG_OUT_SUCCESS_KEY, '');
        window.location.reload();
      } else if (LOG_OUT_SUCCESS_KEY === key) {
        window.localStorage.setItem(LOG_IN_SUCCESS_KEY, '');
        window.location.reload();
      }
    },
    [],
  );

  useStorageListener(
    React.useCallback(
      (event) => {
        handleAuthentication(event.key, event.newValue);
      },
      [handleAuthentication],
    ),
  );
  useMessageListener(
    React.useCallback(
      (event: MessageEvent<AuthenticationMessage>) => {
        handleAuthentication(event.data.key, event.data.value);
      },
      [handleAuthentication],
    ),
  );
}
