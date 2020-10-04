import * as React from 'react';

type Size = 'sm' | 'md' | 'lg';

export type AvatarProps = React.PropsWithChildren<
  {
    size?: Size;
    className?: string;
  } & React.ComponentProps<'img'>
>;

const sizeStyles: Record<Size, string> = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-16 h-16',
};

export function Avatar({
  size = 'md',
  className = '',
  alt = '',
  children,
  ...imgProps
}: AvatarProps): JSX.Element {
  return (
    <img
      {...imgProps}
      alt={alt}
      className={`flex items-center justify-center rounded-full ${sizeStyles[size]} ${className}`}
    >
      {children}
    </img>
  );
}
