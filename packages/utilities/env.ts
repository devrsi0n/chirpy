export const isENVProd = process.env.NODE_ENV === 'production';
export const isENVDev = process.env.NODE_ENV === 'development';

export const ssrMode = typeof window === 'undefined';
export const isBrowser = !ssrMode;

export function getHostEnv(url = window.location.href) {
  const host = new URL(url).hostname;
  if (host.startsWith('staging.')) {
    return 'staging';
  } else if (host.endsWith('vercel.app')) {
    return 'preview';
  } else if (host === 'localhost') {
    return 'localhost';
  } else if (host === 'chirpy.dev') {
    return 'prod';
  }
  return 'unknown';
}
