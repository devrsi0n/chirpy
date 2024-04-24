import { trpc } from '@chirpy-dev/trpc/src/client';
import { TOKEN_KEY } from '@chirpy-dev/utils';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { z } from 'zod';

export type useSignInWindowOptions = {
  width?: number;
  height?: number;
};

export const SignInSuccessSchema = z.object({
  type: z.literal('sign-in-success'),
  jwt: z.string().min(10),
});

export type SignInSuccess = z.infer<typeof SignInSuccessSchema>;

export function useSignInWindow({
  width = 480,
  height = 760,
}: useSignInWindowOptions = {}): () => void {
  const popupWindow = React.useRef<Window | null>(null);
  const utils = trpc.useContext();
  const { update } = useSession();
  const handleClickSignIn = () => {
    popupWindow.current = popupCenterWindow(
      '/auth/sign-in?allowAnonymous=true',
      '_blank',
      width,
      height,
    );
    window.addEventListener('message', (e) => {
      const result = SignInSuccessSchema.safeParse(e.data);
      if (result.success) {
        localStorage.setItem(TOKEN_KEY, result.data.jwt);
        popupWindow.current?.close();
        // Refresh the session
        update();
        utils.invalidate();
      }
    });
  };

  return handleClickSignIn;
}

function popupCenterWindow(
  url: string,
  title: string,
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

  const newWindow = window.open(url, title, features.join(','));
  newWindow?.focus();

  return newWindow;
}
