import clsx from 'clsx';
import * as React from 'react';
import { BaseButton, BaseButtonProps } from './BaseButton';

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
  ...restProps
}: ActionButtonProps): JSX.Element {
  const Icon = icon;
  const { iconStyle, childStyle } = colorStyleFunctions[color](activated);
  return (
    <BaseButton {...restProps} className={clsx('group flex flex-row items-center text-text')}>
      <span className={clsx('rounded-full p-2 group-hover:bg-opacity-10', iconStyle)}>{Icon}</span>
      {children && <span className={childStyle}>{children}</span>}
    </BaseButton>
  );
}

function getPinkClassName(
  activated: boolean | undefined,
): { iconStyle: string; childStyle: string } {
  const textStyle = activated ? `text-pink-500` : `group-hover:text-pink-500`;
  return {
    iconStyle: `${textStyle} group-hover:bg-pink-500`,
    childStyle: `group-hover:text-pink-500`,
  };
}

function getBlueClassName(
  activated: boolean | undefined,
): { iconStyle: string; childStyle: string } {
  const textStyle = activated ? `text-blue-500` : `group-hover:text-blue-500`;
  return {
    iconStyle: `${textStyle} group-hover:bg-blue-500`,
    childStyle: `group-hover:text-blue-500`,
  };
}

function getGreenClassName(
  activated: boolean | undefined,
): { iconStyle: string; childStyle: string } {
  const textStyle = activated ? `text-green-500` : `group-hover:text-green-500`;
  return {
    iconStyle: `${textStyle} group-hover:bg-green-500`,
    childStyle: `group-hover:text-green-500`,
  };
}
