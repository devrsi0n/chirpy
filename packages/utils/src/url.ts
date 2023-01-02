import { isENVDev } from './env';

const protocol = `http${isENVDev ? '' : 's'}://`;

export const API_URL = `${protocol}${process.env.NEXT_PUBLIC_HOST}/api`;
export const APP_DOMAIN = `${protocol}app.${process.env.NEXT_PUBLIC_HOST}`;
export const HOME_DOMAIN = `${protocol}${process.env.NEXT_PUBLIC_HOST}`;

export function isValidHttpUrl(str: string): boolean {
  let url;

  try {
    url = new URL(str);
  } catch {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}
