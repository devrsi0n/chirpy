import clsx from 'clsx';
import * as React from 'react';
import User from '@geist-ui/react-icons/user';

type Size = 'sm' | 'md' | 'lg' | 'xl';

export type AvatarProps = React.ComponentProps<'img'> &
  React.PropsWithChildren<{
    src?: string;
    size?: Size;
    className?: string;
  }>;

const sizeStyles: Record<Size, string> = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

export function Avatar({
  size = 'md',
  className = '',
  alt = '',
  children,
  src,
  ...imgProps
}: AvatarProps): JSX.Element {
  if (!src) {
    return <User size="24" />;
  }

  return (
    <img
      {...imgProps}
      src={src}
      alt={alt}
      className={clsx(
        `flex items-center justify-center rounded-full bg-gray-100 bg-opacity-10 select-none ring-2 ring-gray-50 dark:ring-gray-900`,
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </img>
  );
}
