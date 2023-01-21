import * as React from 'react';

export type VideoProps = {
  src: string;
} & React.ComponentPropsWithoutRef<'video'>;

export function Video({ src, ...videoProps }: VideoProps): JSX.Element {
  return (
    <video controls {...videoProps}>
      <source src={src} type="video/mp4" />
    </video>
  );
}
