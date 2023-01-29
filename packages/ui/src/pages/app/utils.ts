import { isBrowser } from '@chirpy-dev/utils';

export const isAppDomain = isBrowser
  ? window.location.hostname.startsWith('app.')
  : false;
