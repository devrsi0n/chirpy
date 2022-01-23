import User from '@geist-ui/react-icons/user';
import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

type Size = 'sm' | 'md' | 'lg' | 'xl';

export type AvatarProps = React.ComponentProps<'img'> &
  React.PropsWithChildren<{
    src?: string;
    size?: Size;
    className?: string;
  }>;

const sizeStyles: Record<Size, [TwStyle, number]> = {
  sm: [tw`w-4 h-4`, 20],
  md: [tw`w-8 h-8`, 24],
  lg: [tw`w-12 h-12`, 28],
  xl: [tw`w-16 h-16`, 32],
};

export function Avatar({
  size = 'md',
  className = '',
  alt = 'Avatar',
  children,
  src,
  ...imgProps
}: AvatarProps): JSX.Element {
  const [sizeStyle, iconSize] = sizeStyles[size];
  if (!src) {
    return <User aria-label="Avatar placeholder" size={iconSize} tw="m-1" />;
  }

  return (
    <img
      {...imgProps}
      src={src}
      alt={alt}
      className={className}
      css={[bg, tw`flex items-center justify-center rounded-full select-none`, sizeStyle]}
    >
      {children}
    </img>
  );
}

const bg = tw`bg-grayl-100/60 dark:(bg-grayd-100/30)`;
