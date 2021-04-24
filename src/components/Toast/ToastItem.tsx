import AlertCircle from '@geist-ui/react-icons/alertCircle';
import CheckInCircle from '@geist-ui/react-icons/checkInCircle';
import Info from '@geist-ui/react-icons/info';
import Dismiss from '@geist-ui/react-icons/x';
import XCircle from '@geist-ui/react-icons/xCircle';
import * as React from 'react';
import tw from 'twin.macro';

import { IconButton } from '../Button';
import { Heading } from '../Heading';
import { Text } from '../Text';
import { Toast, ToastType } from './ToastContext';

export type ToastProps = React.PropsWithChildren<Toast> & {
  onDismiss: (id: string) => void;
};
export const TOAST_DURATION = 10000;

export function ToastItem({
  id,
  title,
  description,
  type,
  onDismiss: onClickDismiss,
}: ToastProps): JSX.Element {
  React.useEffect(() => {
    const timerId = setTimeout(() => {
      onClickDismiss(id);
    }, TOAST_DURATION);
    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const typeIcon = type ? typeIconMap[type] : null;
  return (
    <section css={[tw`bg-white border py-4 px-6 rounded-md shadow relative`]}>
      <div css={tw`flex flex-row items-start space-x-3 mr-4`}>
        {typeIcon}
        <div css={tw`space-y-2 max-w-lg`}>
          <Heading as="h5" css={tw`leading-none`}>
            {title}
          </Heading>
          <Text variant="base" css={tw`text-gray-500`}>
            {description}
          </Text>
        </div>
      </div>
      <IconButton
        size="sm"
        css={tw`absolute top-1 right-1`}
        onClick={() => onClickDismiss(id)}
        aria-label="Dismiss"
        title="Dismiss"
      >
        <Dismiss />
      </IconButton>
    </section>
  );
}

const typeIconMap: Record<ToastType, JSX.Element> = {
  success: (
    <span tw="text-green-500">
      <CheckInCircle aria-label="Success toast icon" />
    </span>
  ),
  warning: (
    <span tw="text-yellow-500">
      <AlertCircle aria-label="Warning toast icon" />
    </span>
  ),
  error: (
    <span tw="text-red-500">
      <XCircle aria-label="Error toast icon" />
    </span>
  ),
  info: (
    <span tw="text-blue-500">
      <Info aria-label="Info toast icon" />
    </span>
  ),
};
