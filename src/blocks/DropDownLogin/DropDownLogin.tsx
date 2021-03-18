import * as React from 'react';
// import { useRouter } from 'next/router';
import 'twin.macro';

import { DropDownMenu } from '$/components/DropDownMenu';
import { GoogleIcon } from '$/components/Icons';
// @ts-ignore
import GitHubLogo from 'super-tiny-icons/images/svg/github.svg';
import tw from 'twin.macro';

export type DropDownLoginProps = {
  //
};

const handleClickLoginOption = (option: 'google' | 'github') => {
  return () => {
    popupCenterWindow(`/api/auth/${option}`, '_blank', 480, 760);
  };
};

export function DropDownLogin(props: DropDownLoginProps): JSX.Element {
  return (
    <DropDownMenu content="Login" shape="square">
      <DropDownMenu.Item css={itemStyle} onClick={handleClickLoginOption('google')}>
        <GoogleIcon width={20} height={20} />
        <span>Google</span>
      </DropDownMenu.Item>
      <DropDownMenu.Item css={itemStyle} onClick={handleClickLoginOption('github')}>
        <GitHubLogo width={18} height={18} />
        <span>GitHub</span>
      </DropDownMenu.Item>
    </DropDownMenu>
  );
}

const itemStyle = tw`flex flex-row justify-end space-x-4`;

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
  const outerHeight = window.outerHeight || document.documentElement.clientHeight - 22;
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
