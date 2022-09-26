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

/**
 * Get NEXT_PUBLIC_ environment variables, it loads them from window.__env,
 * which is injected at build time for docker,
 * but it returns envValue directly in non docker environment.
 * @example
 * ```js
 * const url = getPublicEnvVar(
 *   'NEXT_PUBLIC_APP_URL',
 *   process.envNEXT_PUBLIC_APP_URL
 * );
 * ```
 */
export function getPublicEnvVar<E extends `NEXT_PUBLIC_${string}`>(
  key: E,
  envValue: string,
): string {
  if (!process.env.DOCKER) {
    return envValue;
  }
  if (isBrowser && window.__env) {
    return window.__env[key] === "''" ? '' : window.__env[key];
  }

  return process.env[key] === "''" ? '' : process.env[key] || '';
}

export const getAppURL = () =>
  getPublicEnvVar('NEXT_PUBLIC_APP_URL', process.env.NEXT_PUBLIC_APP_URL);
