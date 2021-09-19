import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

type Size = 'sm' | 'md' | 'lg' | 'xl';

export type AvatarProps = React.ComponentProps<'img'> &
  React.PropsWithChildren<{
    src?: string;
    size?: Size;
    className?: string;
  }>;

const sizeStyles: Record<Size, TwStyle> = {
  sm: tw`w-4 h-4`,
  md: tw`w-8 h-8`,
  lg: tw`w-12 h-12`,
  xl: tw`w-16 h-16`,
};

export function Avatar({
  size = 'md',
  className = '',
  alt = 'Avatar',
  children,
  src,
  ...imgProps
}: AvatarProps): JSX.Element {
  const sizeStyle = sizeStyles[size];
  if (!src) {
    return (
      <span
        aria-label="An empty image for a user has no avatar"
        css={[tw`inline-block rounded-full overflow-hidden bg-gray-200`, sizeStyle]}
      >
        <svg tw="h-full w-full text-gray-900" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </span>
    );
  }

  return (
    <img
      {...imgProps}
      src={src}
      alt={alt}
      className={className}
      css={[
        tw`flex items-center justify-center rounded-full bg-gray-100 select-none ring-2 ring-gray-200`,
        sizeStyle,
      ]}
    >
      {children}
    </img>
  );
}
