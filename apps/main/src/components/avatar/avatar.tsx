import clsx from 'clsx';
import * as React from 'react';

import { IconUser } from '../icons';
import { DeferredCustomAvatar } from './custom-avatar';

type Size = 'sm' | 'md' | 'lg' | 'xl';

export type AvatarProps = Omit<React.ComponentProps<'img'>, 'src'> &
  React.PropsWithChildren<{
    src?: string | null;
    size?: Size;
    className?: string;
    email?: string | null;
    name?: string | null;
    username?: string | null;
  }>;

const sizeStyles: Record<Size, [string, number]> = {
  sm: [`w-4 h-4`, 20],
  md: [`w-8 h-8`, 32],
  lg: [`w-12 h-12`, 48],
  xl: [`w-16 h-16`, 64],
};

export function Avatar({
  size = 'md',
  className,
  alt = 'Avatar',
  children,
  src,
  email,
  name,
  username,
  ...imgProps
}: AvatarProps): JSX.Element {
  const [sizeStyle, iconSize] = sizeStyles[size];
  if (!src) {
    const placeholder = (
      <IconUser
        size={iconSize * 0.75}
        className={clsx('m-1 rounded-full', ring, className)}
        aria-label={alt}
      />
    );
    const customAvatarValue = name || username || email;
    if (customAvatarValue) {
      return (
        <DeferredCustomAvatar
          value={customAvatarValue}
          fallback={placeholder}
          size={iconSize}
          border
          className={clsx(className)}
        />
      );
    }
    return placeholder;
  }

  return (
    <img
      {...imgProps}
      src={src}
      alt={alt}
      className={clsx(
        bg,
        ring,
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
const ring = `ring ring-white`;
