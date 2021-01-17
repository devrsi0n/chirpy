import clsx from 'clsx';
import * as React from 'react';

import { SunIcon, ISunIconProps, SpinnerIcon, SettingIcon, MoonIcon } from '../Icons';
import { BaseButton, BaseButtonProps } from './BaseButton';

type Size = 'sm' | 'md' | 'lg';
type Icon = 'sun' | 'moon' | 'setting' | 'spinner';

export type IconButtonProps = BaseButtonProps & {
  icon?: Icon;
  size?: Size;
  children?: React.ReactNode;
};

const sizeStyles: Record<Size, [string, number]> = {
  sm: ['p-2', 14],
  md: ['p-4', 18],
  lg: ['p-6', 24],
};

const icons: Record<Icon, React.FunctionComponent<ISunIconProps>> = {
  sun: SunIcon,
  moon: MoonIcon,
  setting: SettingIcon,
  spinner: SpinnerIcon,
};

export function IconButton({
  size = 'md',
  icon,
  children,
  ...restProps
}: IconButtonProps): JSX.Element {
  const Icon = icon ? icons[icon] : null;
  const [style, sizeNumber] = sizeStyles[size];
  return (
    <BaseButton
      {...restProps}
      className={clsx(
        'rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-200',
        style,
      )}
    >
      {Icon && <Icon size={sizeNumber} />}
      {children}
    </BaseButton>
  );
}
