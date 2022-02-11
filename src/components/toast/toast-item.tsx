import AlertCircle from '@geist-ui/react-icons/alertCircle';
import CheckInCircle from '@geist-ui/react-icons/checkInCircle';
import Info from '@geist-ui/react-icons/info';
import Dismiss from '@geist-ui/react-icons/x';
import XCircle from '@geist-ui/react-icons/xCircle';
import * as React from 'react';
import tw from 'twin.macro';

import { useTimeout } from '$/hooks/use-timeout';

import { IconButton, Button } from '../button';
import { Card } from '../card';
import { Heading } from '../heading';
import { Text } from '../text';
import { IToast, ToastType } from './toast-context';

export type ToastProps = React.PropsWithChildren<IToast> & {
  onDismiss: (id: string) => void;
};
export const TOAST_DURATION = 10_000;

export function ToastItem({
  id,
  title,
  description,
  type,
  onDismiss,
  persistent,
  action,
}: ToastProps): JSX.Element {
  useTimeout(
    () => {
      onDismiss(id);
    },
    !persistent ? TOAST_DURATION : null,
  );

  const typeIcon = type ? typeIconMap[type] : null;
  return (
    <Card as="section" css={[tw`py-4 pl-6 pr-2 shadow-lg relative`]}>
      <div css={tw`flex flex-row justify-between items-center`}>
        <div tw="flex flex-row items-center space-x-4 mr-4">
          {typeIcon}
          <div css={tw`space-y-2 max-w-lg`}>
            <Heading as="h5" css={tw`leading-none`}>
              {title}
            </Heading>
          </div>
        </div>
        {action && (
          <Button
            size="sm"
            variant="solid"
            color="primary"
            tw="ml-4"
            onClick={() => {
              action.onClick();
              onDismiss(id);
            }}
          >
            {action.label}
          </Button>
        )}
        <IconButton
          css={tw`w-fit h-fit ml-4`}
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
