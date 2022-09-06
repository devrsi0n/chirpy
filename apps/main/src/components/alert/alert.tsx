import clsx from 'clsx';
import * as React from 'react';

import { IconButton, IconButtonColor } from '../button';
import { IconAlertCircle, IconCheckInCircle, IconX } from '../icons';

export type AlertType = 'warn' | 'info' | 'success';

export type AlertAlign = 'center' | 'left';

export type AlertProps = {
  type: AlertType;
  title: string;
  content?: string;
  onClickDismiss?: () => void;
  align?: AlertAlign;
  className?: string;
};

export function Alert(props: AlertProps): JSX.Element {
  const [style, Icon, iconButtonColor] = TYPE_STYLES[props.type];
  return (
    <div
      className={clsx(
        'group relative flex flex-row items-start  space-x-3 rounded border p-4',
        props.align === 'center' ? 'justify-center' : 'justify-start',
        style,
        props.className,
      )}
    >
      <Icon size={20} className="" />
      <div className="">
        <h4 className="text-base font-semibold leading-tight">{props.title}</h4>
        {props.content && <p className="mt-1">{props.content}</p>}
      </div>
      <IconButton
        className={clsx(
          'invisible !absolute right-4  group-hover:visible',
          props.content && 'top-4',
        )}
        onClick={props.onClickDismiss}
        aria-label="Dismiss"
        color={iconButtonColor}
      >
        <IconX size={18} />
      </IconButton>
    </div>
  );
}

const TYPE_STYLES: Record<
  AlertType,
  [
    string,
    React.FC<{ size?: string | number; className?: string }>,
    IconButtonColor,
  ]
> = {
  warn: [
    `bg-yellow-300 text-yellow-1100 border-yellow-600`,
    IconAlertCircle,
    'yellow',
  ],
  info: [
    `bg-primary-300 text-primary-1100 border-primary-600`,
    IconAlertCircle,
    'primary',
  ],
  success: [
    `bg-green-300 text-green-1100 border-green-600`,
    IconCheckInCircle,
    'green',
  ],
};
