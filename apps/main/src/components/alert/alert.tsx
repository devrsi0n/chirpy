import clsx from 'clsx';
import * as React from 'react';

import { IconButton } from '../button';
import { IconX } from '../icons';

export type AlertType = 'warn';

export type AlertProps = React.PropsWithChildren<{
  type: AlertType;
  onClickDismiss?: () => void;
}>;

export function Alert(props: AlertProps): JSX.Element {
  return (
    <div
      className={clsx(
        'group flex flex-row items-center justify-center space-x-2 rounded py-2 px-4',
        typeStyles[props.type],
      )}
    >
      <p className="pl-6 pr-2 text-base leading-tight">{props.children}</p>
      <IconButton
        className="invisible group-hover:visible"
        onClick={props.onClickDismiss}
        aria-label="Dismiss"
      >
        <IconX size={18} />
      </IconButton>
    </div>
  );
}

const typeStyles: Record<AlertType, string> = {
  warn: `bg-yellow-300 text-yellow-1100`,
};
