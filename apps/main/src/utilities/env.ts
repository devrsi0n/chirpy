export const isSSRMode = typeof window === 'undefined';

export const isBrowser = !isSSRMode;

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
