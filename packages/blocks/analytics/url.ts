import { ANALYTICS_DOMAIN, WIDGET_COMMENT_PATH } from '@chirpy/utilities';
import { Site } from './type';

export function apiPath(site: Site, path = '') {
  return `/api/stats/${ANALYTICS_DOMAIN}${path}`;
}

export function siteBasePath(site: Site, path = '') {
  return `/${ANALYTICS_DOMAIN}${path}`;
}

export function sitePath(site: Site, path = '') {
  return siteBasePath(site, path) + window.location.search;
}

export function setQuery(key: string, value: string) {
  const query = new URLSearchParams(window.location.search);
  query.set(key, value);
  return `${window.location.pathname}?${query.toString()}`;
}

export function externalLinkForPage(domain: string, page: string) {
  if (page.startsWith(WIDGET_COMMENT_PATH)) {
    return page.slice(WIDGET_COMMENT_PATH.length);
  }
  const domainURL = new URL(`https://${domain}`);
  return `https://${domainURL.host}${page}`;
}
