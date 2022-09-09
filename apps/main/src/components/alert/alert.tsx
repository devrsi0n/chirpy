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
  hideDismissButton?: true;
  styles?: {
    root?: string;
    container?: string;
    dismissButton?: string;
  };
};

export function Alert(props: AlertProps): JSX.Element {
  const [style, Icon, iconButtonColor] = TYPE_STYLES[props.type];
  return (
    <section
      className={clsx(
        'group relative flex w-full flex-row items-start justify-between rounded border p-4',
        style,
        props.styles?.root,
      )}
    >
      <div
        className={clsx(
          'flex flex-1 flex-col items-start space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3',
          props.align === 'center' ? 'justify-center' : 'justify-start',
          props.styles?.container,
        )}
      >
        <Icon size={20} className="" />
        <div className="">
          <h4 className="text-base font-semibold leading-tight">
            {props.title}
          </h4>
          {props.content && <p className="mt-1">{props.content}</p>}
        </div>
      </div>
      {!props.hideDismissButton && (
        <IconButton
          className={clsx(
            'invisible group-hover:visible',
            props.styles?.dismissButton,
          )}
          onClick={props.onClickDismiss}
          aria-label="Dismiss"
          color={iconButtonColor}
        >
          <IconX size={18} />
        </IconButton>
      )}
    </section>
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
