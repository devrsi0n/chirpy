import clsx from 'clsx';
import * as React from 'react';

import { useTimeout } from '../../hooks/use-timeout';
import { IconButton, Button } from '../button';
import { Card } from '../card';
import { Heading } from '../heading';
import {
  IconCheckInCircle,
  IconX,
  IconAlertCircle,
  IconXCircle,
  IconInfo,
} from '../icons';
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
    <Card as="section" className="relative py-4 pl-6 pr-2 shadow-lg">
      <div className={clsx(`flex flex-row items-center justify-between`)}>
        <div className="mr-4 flex flex-row items-center space-x-4">
          {typeIcon}
          <div className={`max-w-lg space-y-2`}>
            <Heading as="h5" className={`!leading-none`}>
              {title}
            </Heading>
          </div>
        </div>
        {action && (
          <Button
            size="sm"
            variant="solid"
            color="primary"
            className="ml-4"
            onClick={() => {
              action.onClick();
              onDismiss(id);
            }}
          >
            {action.label}
          </Button>
        )}
        <IconButton
          className={`ml-4 h-fit w-fit`}
          onClick={() => onDismiss(id)}
          aria-label="Dismiss"
          title="Dismiss"
        >
          <IconX />
        </IconButton>
      </div>
      {description && (
        <div className="ml-10 mt-2">
          <Text variant="secondary">{description}</Text>
        </div>
      )}
    </Card>
  );
}

const iconSize = `w-6`;

const typeIconMap: Record<ToastType, JSX.Element> = {
  success: (
    <span className={clsx('text-green-900', iconSize)}>
      <IconCheckInCircle aria-label="Success toast icon" />
    </span>
  ),
  warning: (
    <span className={clsx('text-yellow-900', iconSize)}>
      <IconAlertCircle aria-label="Warning toast icon" />
    </span>
  ),
  error: (
    <span className={clsx('text-red-900', iconSize)}>
      <IconXCircle aria-label="Error toast icon" />
    </span>
  ),
  info: (
    <span className={clsx('text-blue-900', iconSize)}>
      <IconInfo aria-label="Info toast icon" />
    </span>
  ),
};
