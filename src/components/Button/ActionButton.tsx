import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

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
  disabled,
  ...restProps
}: ActionButtonProps): JSX.Element {
  const Icon = icon;
  const { iconStyle, childStyle } = colorStyleFunctions[color](activated);
  return (
    <BaseButton
      {...restProps}
      className="group"
      css={[tw`flex flex-row items-center text-gray-1100`, disabled && tw`text-gray-900`]}
    >
      <span css={[tw`rounded-full p-2 group-hover:bg-opacity-10`, !disabled && iconStyle]}>
        {Icon}
      </span>
      {children && <span css={!disabled && childStyle}>{children}</span>}
    </BaseButton>
  );
}

function getPinkClassName(activated: boolean | undefined): {
  iconStyle: TwStyle[];
  childStyle: TwStyle;
} {
  const textStyle = activated ? tw`text-pink-900` : tw`group-hover:text-pink-900`;
  return {
    iconStyle: [textStyle, tw`group-hover:bg-pink-300`],
    childStyle: tw`group-hover:text-pink-900`,
  };
}

function getBlueClassName(activated: boolean | undefined): {
  iconStyle: TwStyle[];
  childStyle: TwStyle;
} {
  const textStyle = activated ? tw`text-blue-900` : tw`group-hover:text-blue-900`;
  return {
    iconStyle: [textStyle, tw`group-hover:bg-blue-300`],
    childStyle: tw`group-hover:text-blue-900`,
  };
}

function getGreenClassName(activated: boolean | undefined): {
  iconStyle: TwStyle[];
  childStyle: TwStyle;
} {
  const textStyle = activated ? tw`text-green-900` : tw`group-hover:text-green-900`;
  return {
    iconStyle: [textStyle, tw`group-hover:bg-green-300`],
    childStyle: tw`group-hover:text-green-900`,
  };
}
