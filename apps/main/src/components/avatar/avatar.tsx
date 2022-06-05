import clsx from 'clsx';
import * as React from 'react';

import { IconUser } from '../icons';

type Size = 'sm' | 'md' | 'lg' | 'xl';

export type AvatarProps = Omit<React.ComponentProps<'img'>, 'src'> &
  React.PropsWithChildren<{
    src?: string | null;
    size?: Size;
    className?: string;
  }>;

const sizeStyles: Record<Size, [string, number]> = {
  sm: [`w-4 h-4`, 20],
  md: [`w-8 h-8`, 24],
  lg: [`w-12 h-12`, 28],
  xl: [`w-16 h-16`, 32],
};

export function Avatar({
  size = 'md',
  className,
  alt = 'Avatar',
  children,
  src,
  ...imgProps
}: AvatarProps): JSX.Element {
  const [sizeStyle, iconSize] = sizeStyles[size];
  if (!src) {
    return <IconUser aria-label="Avatar placeholder" size={iconSize} className="m-1" />;
  }

  return (
    <img
      {...imgProps}
      src={src}
      alt={alt}
      className={clsx(
        bg,
        `flex select-none items-center justify-center rounded-full`,
        sizeStyle,
        className,
      )}
    >
      {children}
    </img>
  );
}

const bg = `bg-grayl-100/60 dark:bg-grayd-100/30`;
