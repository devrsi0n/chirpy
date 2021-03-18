import * as React from 'react';
import ArrowLeft from '@geist-ui/react-icons/arrowLeft';
import tw, { TwStyle } from 'twin.macro';

import { SunIcon, ISunIconProps, SpinnerIcon, SettingIcon, MoonIcon } from '../Icons';
import { BaseButton, BaseButtonProps } from './BaseButton';

type Size = 'sm' | 'md' | 'lg';
type Icon = 'sun' | 'moon' | 'setting' | 'spinner' | 'arrow-left';

export type IconButtonProps = BaseButtonProps & {
  icon?: Icon;
  size?: Size;
  children?: React.ReactNode;
};

const sizeStyles: Record<Size, [TwStyle, number]> = {
  sm: [tw`p-2`, 14],
  md: [tw`p-3`, 18],
  lg: [tw`p-6`, 24],
};

const icons: Record<Icon, React.FunctionComponent<ISunIconProps>> = {
  sun: SunIcon,
  moon: MoonIcon,
  setting: SettingIcon,
  spinner: SpinnerIcon,
  'arrow-left': ArrowLeft as $TsFixMe,
};

export const IconButton = React.forwardRef(function IconButton(
  { size = 'md', icon, children, ...restProps }: IconButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): JSX.Element {
  const Icon = icon ? icons[icon] : null;
  const [style, sizeNumber] = sizeStyles[size];
  return (
    <BaseButton
      ref={ref}
      {...restProps}
      css={[
        tw`rounded-full hover:(bg-gray-400 bg-opacity-10) focus:(outline-none ring-2 ring-inset ring-gray-200)`,
        style,
      ]}
    >
      {Icon && <Icon size={sizeNumber} />}
      {children}
    </BaseButton>
  );
});
