import { Site } from './type';

export function apiPath(site: Site, path = '') {
  return `/api/stats/${encodeURIComponent(site.domain)}${path}`;
}

export function siteBasePath(site: Site, path = '') {
  return `/${encodeURIComponent(site.domain)}${path}`;
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
  const domainURL = new URL(`https://${domain}`);
  return `https://${domainURL.host}${page}`;
}
