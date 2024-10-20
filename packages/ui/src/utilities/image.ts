import { isSSRMode } from '@chirpy-dev/utils';
import { ImageProps } from 'next/image';

export type BannerImgProps = {
  src: string;
} & Pick<ImageProps, 'width' | 'height'>;

export function getBannerProps(banner?: string): BannerImgProps | null {
  if (isSSRMode || !banner) {
    return null;
  }
  const url = new URL(banner, window.location.origin);
  const width = Number.parseInt(url.searchParams.get('width') || '0', 10);
  const height = Number.parseInt(url.searchParams.get('height') || '0', 10);
  return {
    src: url.pathname,
    width,
    height,
  };
}
