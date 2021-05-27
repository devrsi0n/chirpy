import NextImage, { ImageProps as NextImageProps } from 'next/image';
import * as React from 'react';

export type ImageProps = NextImageProps;

export function Image(props: ImageProps): JSX.Element {
  return <NextImage {...props} />;
}
