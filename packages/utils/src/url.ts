const homeUrl = new URL(process.env.NEXT_PUBLIC_HOME_ORIGIN);
const protocol = homeUrl.protocol;

export const HOME_HOST: string = homeUrl.host;
export const HOME_ORIGIN: string = process.env.NEXT_PUBLIC_HOME_ORIGIN;
export const API_URL = `${HOME_ORIGIN}/api`;
export const APP_ORIGIN = `${protocol}//app.${HOME_HOST}`;

export function isValidHttpUrl(str: string): boolean {
  let url;

  try {
    url = new URL(str);
  } catch {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}
