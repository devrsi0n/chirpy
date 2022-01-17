import AlertCircle from '@geist-ui/react-icons/alertCircle';
import CheckInCircle from '@geist-ui/react-icons/checkInCircle';
import Info from '@geist-ui/react-icons/info';
import Dismiss from '@geist-ui/react-icons/x';
import XCircle from '@geist-ui/react-icons/xCircle';
import * as React from 'react';
import tw from 'twin.macro';

import { useTimeout } from '$/hooks/useTimeout';

import { IconButton } from '../Button';
import { Card } from '../Card';
import { Heading } from '../Heading';
import { Text } from '../Text';
import { Toast, ToastType } from './ToastContext';

export type ToastProps = React.PropsWithChildren<Toast> & {
  onDismiss: (id: string) => void;
};
export const TOAST_DURATION = 10_000;

export function ToastItem({ id, title, description, type, onDismiss }: ToastProps): JSX.Element {
  useTimeout(() => {
    onDismiss(id);
  }, TOAST_DURATION);

  const typeIcon = type ? typeIconMap[type] : null;
  return (
    <Card as="section" shadow={false} css={[tw`py-4 pl-6 pr-2 shadow relative`]}>
      <div css={tw`flex flex-row justify-between`}>
        <div tw="flex flex-row items-center space-x-4 mr-4">
          {typeIcon}
          <div css={tw`space-y-2 max-w-lg`}>
            <Heading as="h5" css={tw`leading-none`}>
              {title}
            </Heading>
          </div>
        </div>
        <IconButton
          css={tw`w-fit h-fit`}
          onClick={() => onDismiss(id)}
          aria-label="Dismiss"
          title="Dismiss"
        >
          <Dismiss />
        </IconButton>
      </div>
      {description && (
        <div tw="ml-10 mt-2">
          <Text variant="secondary">{description}</Text>
        </div>
      )}
    </Card>
  );
}

const iconSize = tw`w-6`;

const typeIconMap: Record<ToastType, JSX.Element> = {
  success: (
    <span tw="text-green-900" css={iconSize}>
      <CheckInCircle aria-label="Success toast icon" />
    </span>
  ),
  warning: (
    <span tw="text-yellow-900" css={iconSize}>
      <AlertCircle aria-label="Warning toast icon" />
    </span>
  ),
  error: (
    <span tw="text-red-900" css={iconSize}>
      <XCircle aria-label="Error toast icon" />
    </span>
  ),
  info: (
    <span tw="text-blue-900" css={iconSize}>
      <Info aria-label="Info toast icon" />
    </span>
  ),
};
