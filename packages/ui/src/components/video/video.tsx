import clsx from 'clsx';
import * as React from 'react';

export type VideoProps = {
  src: string;
} & React.ComponentPropsWithoutRef<'video'>;

export function Video({
  src,
  className,
  ...videoProps
}: VideoProps): JSX.Element {
  return (
    <video controls {...videoProps} className={clsx('rounded-lg', className)}>
      <source src={src} type="video/mp4" />
    </video>
  );
}
