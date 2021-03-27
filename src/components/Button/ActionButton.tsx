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
      css={[tw`flex flex-row items-center text-gray-600`, disabled && tw`text-gray-300`]}
    >
      <span css={[tw`rounded-full p-2 group-hover:bg-opacity-10`, !disabled && iconStyle]}>
        {Icon}
      </span>
      {children && <span css={!disabled && childStyle}>{children}</span>}
    </BaseButton>
  );
}

function getPinkClassName(
  activated: boolean | undefined,
): { iconStyle: TwStyle[]; childStyle: TwStyle } {
  const textStyle = activated ? tw`text-pink-500` : tw`group-hover:text-pink-500`;
  return {
    iconStyle: [textStyle, tw`group-hover:bg-pink-50`],
    childStyle: tw`group-hover:text-pink-500`,
  };
}

function getBlueClassName(
  activated: boolean | undefined,
): { iconStyle: TwStyle[]; childStyle: TwStyle } {
  const textStyle = activated ? tw`text-blue-500` : tw`group-hover:text-blue-500`;
  return {
    iconStyle: [textStyle, tw`group-hover:bg-blue-50`],
    childStyle: tw`group-hover:text-blue-500`,
  };
}

function getGreenClassName(
  activated: boolean | undefined,
): { iconStyle: TwStyle[]; childStyle: TwStyle } {
  const textStyle = activated ? tw`text-green-500` : tw`group-hover:text-green-500`;
  return {
    iconStyle: [textStyle, tw`group-hover:bg-green-50`],
    childStyle: tw`group-hover:text-green-500`,
  };
}
