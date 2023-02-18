import clsx from 'clsx';
import * as React from 'react';

import { IconUser } from '../icons';
import { Text } from '../text';
import { DeferredCustomAvatar } from './custom-avatar';

type Size = 'sm' | 'md' | 'lg' | 'xl';

export type AvatarProps = Omit<React.ComponentProps<'img'>, 'src' | 'alt'> &
  React.PropsWithChildren<{
    src: string | null | undefined;
    name: string | null | undefined;
    email?: string | null | undefined;
    username?: string | null | undefined;
    alt: string | null | undefined;
    size?: Size;
  }> & {
    showLabel?: boolean;
  };

const sizeStyles: Record<
  Size,
  {
    image: string;
    icon: number;
    label: {
      title: string;
      text: string;
    };
  }
> = {
  sm: {
    image: `w-8 h-8`,
    icon: 32,
    label: {
      title: 'text-sm',
      text: 'text-xs',
    },
  },
  md: {
    image: `w-10 h-10`,
    icon: 40,
    label: {
      title: 'text-sm',
      text: 'text-sm',
    },
  },
  lg: {
    image: `w-12 h-12`,
    icon: 48,
    label: {
      title: 'text-md',
      text: 'text-md',
    },
  },
  xl: {
    image: `w-14 h-14`,
    icon: 56,
    label: {
      title: 'text-lg',
      text: 'text-md',
    },
  },
};

export function Avatar({ showLabel, ...imageProps }: AvatarProps): JSX.Element {
  const { size = 'md', name, username, email } = imageProps;
  const { label } = sizeStyles[size];
  return (
    <div className={clsx(showLabel && `flex flex-row items-center space-x-3`)}>
      <AvatarImage {...imageProps} />
      {showLabel && (
        <div className="flex flex-col items-start pr-2">
          <Text className={clsx('font-semibold', label.title)}>
            {name || username}
          </Text>
          <Text variant="secondary" className={label.text}>
            {email}
          </Text>
        </div>
      )}
    </div>
  );
}

type AvatarImageProps = Omit<AvatarProps, 'showLabel'>;

function AvatarImage({
  size = 'md',
  className,
  alt,
  children,
  src,
  email,
  name,
  username,
  ...imgProps
}: AvatarImageProps) {
  alt ||= 'Default avatar';
  const { image, icon: iconSize } = sizeStyles[size];
  if (!src) {
    const placeholder = (
      <IconUser
        size={iconSize * 0.75}
        className={clsx('m-1 rounded-full', ring, className)}
        aria-label={alt}
      />
    );
    // Keep this order to reduce name collision
    const customAvatarValue = username || email || name;
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
        image,
        className,
      )}
    >
      {children}
    </img>
  );
}

const bg = `bg-grayl-100/60 dark:bg-grayd-100/30`;
const ring = `ring ring-white`;
