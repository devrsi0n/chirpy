import clsx from 'clsx';
import * as React from 'react';
import { BaseButton, BaseButtonProps } from './BaseButton';

type Color = 'pink' | 'indigo';

export type ActionButtonProps = BaseButtonProps & {
  icon: React.ReactNode;
  color: Color;
  activated?: boolean;
};

export function ActionButton({
  icon,
  children,
  color,
  activated,
  ...restProps
}: ActionButtonProps): JSX.Element {
  const Icon = icon;
  const { iconStyle, childStyle } = getClassName(color, activated);
  return (
    <BaseButton {...restProps} className={clsx('group flex flex-row items-center')}>
      <span className={clsx('rounded-full p-2', iconStyle)}>{Icon}</span>
      {children && <span className={childStyle}>{children}</span>}
    </BaseButton>
  );
}

function getClassName(color: Color, activated: boolean): { iconStyle: string; childStyle: string } {
  const textStyle = activated ? `text-${color}-500` : `group-hover:text-${color}-500`;
  return {
    iconStyle: `${textStyle} group-hover:bg-${color}-50`,
    childStyle: `group-hover:text-${color}-500`,
  };
}
