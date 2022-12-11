import { SIGN_IN_SUCCESS_KEY } from '@chirpy-dev/utils';
import { getSession } from 'next-auth/react';
import * as React from 'react';

import { useEventListener } from './use-event-listener';

export type useSignInWindowOptions = {
  width?: number;
  height?: number;
};

export function useSignInWindow({
  width = 480,
  height = 760,
}: useSignInWindowOptions = {}): () => void {
  const popupWindow = React.useRef<Window | null>(null);
  const handleClickSignIn = () => {
    popupWindow.current = popupCenterWindow(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/sign-in?allowAnonymous=true`,
      '_blank',
      width,
      height,
    );
  };

  useEventListener('storage', async (event) => {
    if (event.key === SIGN_IN_SUCCESS_KEY && event.newValue === 'true') {
      popupWindow.current?.close();
      popupWindow.current = null;
      // Force to refresh session
      await getSession();
    }
  });

  return handleClickSignIn;
}

function popupCenterWindow(
  url: string,
  target: string,
  width: number,
  height: number,
): Window | null {
  const { userAgent } = navigator;
  const isMobile =
    /\b(iPhone|iP[ao]d)/.test(userAgent) ||
    /\b(iP[ao]d)/.test(userAgent) ||
    /android/i.test(userAgent) ||
    /mobile/i.test(userAgent);
  const screenX = window.screenX || window.screenLeft;
  const screenY = window.screenY || window.screenTop;
  const outerWidth = window.outerWidth || document.documentElement.clientWidth;
  const outerHeight =
    window.outerHeight || document.documentElement.clientHeight - 22;
  const targetWidth = isMobile ? 0 : width;
  const targetHeight = isMobile ? 0 : height;
  const V = screenX < 0 ? window.screen.width + screenX : screenX;
  const left = V + (outerWidth - targetWidth) / 2;
  const right = screenY + (outerHeight - targetHeight) / 2.5;
  const features = [];
  if (targetWidth !== 0) {
    features.push('width=' + targetWidth);
  }
  if (targetHeight !== 0) {
    features.push('height=' + targetHeight);
  }
  features.push('left=' + left, 'top=' + right, 'scrollbars=1');

  const newWindow = window.open(url, target, features.join(','));
  newWindow?.focus();

  return newWindow;
}
