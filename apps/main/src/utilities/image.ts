import { isSSRMode } from './env';

export type BannerProps = {
  src: string;
  width: string;
  height: string;
};

export function getBannerProps(banner?: string): BannerProps | null {
  if (isSSRMode || !banner) {
    return null;
  }
  const url = new URL(banner, window.location.origin);
  const width = url.searchParams.get('width') || '0';
  const height = url.searchParams.get('height') || '0';
  return {
    src: url.pathname,
    width,
    height,
  };
}
