import * as React from 'react';

import { LOG_OUT_SUCCESS_KEY } from '$/lib/constants';

export function useLogout(): () => void {
  const handleClickLogOut = React.useCallback(() => {
    fetch('/api/auth/logout').then(() => {
      if (window.localStorage.getItem(LOG_OUT_SUCCESS_KEY) === 'true') {
        window.localStorage.setItem(LOG_OUT_SUCCESS_KEY, '');
      }
      window.localStorage.setItem(LOG_OUT_SUCCESS_KEY, 'true');
    });
  }, []);
  return handleClickLogOut;
}
