export const ssrMode = typeof window === 'undefined';

export const isBrowser = !ssrMode;
