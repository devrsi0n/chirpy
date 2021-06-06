import database from 'geoip-database';
import isLocalhost from 'is-localhost-ip';
import maxmind, { CityResponse, Reader } from 'maxmind';
import { NextApiRequest } from 'next';
import requestIp from 'request-ip';
import UAParser from 'ua-parser-js';

import {
  DESKTOP_OS,
  DESKTOP_SCREEN_WIDTH,
  LAPTOP_SCREEN_WIDTH,
  MOBILE_OS,
  MOBILE_SCREEN_WIDTH,
} from './constants';

export async function getClientInfo(req: NextApiRequest, { screen }: { screen: string }) {
  const userAgent = req.headers['user-agent']!;
  const ip = getIpAddress(req);
  const country = await getCountry(req, ip);
  const uaParser = new UAParser(userAgent);
  const upBrowser = uaParser.getBrowser();
  const browser = upBrowser.name + ' ' + upBrowser.version;
  const upOS = uaParser.getOS();
  const os = upOS.name + ' ' + upOS.version;
  const device = getDevice(screen, os);

  return { userAgent, browser, os, ip, country, device };
}

export async function getCountry(req: NextApiRequest, ip: string) {
  // Cloudflare
  if (req.headers['cf-ipcountry']) {
    return req.headers['cf-ipcountry'] as string;
  }

  if (await isLocalhost(ip)) {
    return 'local';
  }

  const lookup: Reader<CityResponse> = await maxmind.open(database.country);
  const result = lookup.get(ip);

  return result?.country?.iso_code;
}

export function getDevice(screen: string, os: string) {
  if (!screen) return;

  const [widthString] = screen.split('x');
  const width = Number.parseInt(widthString, 10);

  if (DESKTOP_OS.includes(os)) {
    if (os === 'Chrome OS' || width < DESKTOP_SCREEN_WIDTH) {
      return 'laptop';
    }
    return 'desktop';
  } else if (MOBILE_OS.includes(os)) {
    if (os === 'Amazon OS' || width > MOBILE_SCREEN_WIDTH) {
      return 'tablet';
    }
    return 'mobile';
  }

  if (width >= DESKTOP_SCREEN_WIDTH) {
    return 'desktop';
  } else if (width >= LAPTOP_SCREEN_WIDTH) {
    return 'laptop';
  } else if (width >= MOBILE_SCREEN_WIDTH) {
    return 'tablet';
  } else {
    return 'mobile';
  }
}

export function getIpAddress(req: NextApiRequest): string {
  // Cloudflare
  if (req.headers['cf-connecting-ip']) {
    return req.headers['cf-connecting-ip'] as string;
  }

  return requestIp.getClientIp(req) || '';
}
