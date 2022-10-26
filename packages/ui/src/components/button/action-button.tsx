import clsx from 'clsx';
import * as React from 'react';

import { BaseButton, BaseButtonProps } from './base-button';

type Color = 'pink' | 'blue' | 'green';

export type ActionButtonProps = BaseButtonProps & {
  icon: React.ReactNode;
  color: Color;
  activated?: boolean;
};

const colorStyleFunctions: Record<Color, typeof getPinkClassName> = {
  pink: getPinkClassName,
  blue: getBlueClassName,
  green: getGreenClassName,
};

export function ActionButton({
  icon,
  children,
  color,
  activated,
  disabled,
  className,
  ...restProps
}: ActionButtonProps): JSX.Element {
  const Icon = icon;
  const { iconStyle, childStyle } = colorStyleFunctions[color](activated);
  return (
    <BaseButton
      {...restProps}
      className={clsx(
        'group flex flex-row items-center text-gray-1100 disabled:text-gray-900',
        className,
      )}
      disabled={disabled}
    >
      <span
        className={clsx(
          `rounded-full p-2 group-hover:bg-opacity-10`,
          !disabled && iconStyle,
        )}
      >
        {Icon}
      </span>
      {children && (
        <span className={clsx(!disabled && childStyle)}>{children}</span>
      )}
    </BaseButton>
  );
}

function getPinkClassName(activated: boolean | undefined): {
  iconStyle: string;
  childStyle: string;
} {
  const textStyle = activated ? `text-pink-900` : `group-hover:text-pink-900`;
  return {
    iconStyle: clsx(textStyle, `group-hover:bg-pink-300`),
    childStyle: `group-hover:text-pink-900`,
  };
}

function getBlueClassName(activated: boolean | undefined): {
  iconStyle: string;
  childStyle: string;
} {
  const textStyle = activated ? `text-blue-900` : `group-hover:text-blue-900`;
  return {
    iconStyle: clsx(textStyle, `group-hover:bg-blue-300`),
    childStyle: `group-hover:text-blue-900`,
  };
}

function getGreenClassName(activated: boolean | undefined): {
  iconStyle: string;
  childStyle: string;
} {
  const textStyle = activated ? `text-green-900` : `group-hover:text-green-900`;
  return {
    iconStyle: clsx(textStyle, `group-hover:bg-green-300`),
    childStyle: `group-hover:text-green-900`,
  };
}
