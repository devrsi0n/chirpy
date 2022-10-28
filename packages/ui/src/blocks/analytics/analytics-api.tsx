import { Primitive } from 'type-fest';

import { WIDGET_COMMENT_PATH, isSSRMode } from '@chirpy-dev/utils';

import { formatISO } from './date';
import { Query } from './query';
import { Site } from './type';

let abortController = isSSRMode ? ({} as any) : new AbortController();
let SHARED_LINK_AUTH: string | null = null;

class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

function serialize(obj: Record<string, any>) {
  const str = [];
  for (const p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
}

export function setSharedLinkAuth(auth: string) {
  SHARED_LINK_AUTH = auth;
}

export function cancelAll() {
  abortController.abort();
  abortController = new AbortController();
}

function serializeFilters(filters: Record<string, any> = {}, site: Site) {
  const cleaned: Record<string, any> = {};
  Object.entries(filters).forEach(([key, val]) =>
    val ? (cleaned[key] = val) : null,
  );
  return JSON.stringify({
    ...cleaned,
    page: `${WIDGET_COMMENT_PATH}https://${site.domain}**`,
  });
}

export function serializeQuery(
  query: Partial<Query>,
  site: Site,
  extraSearchParameter: Array<Record<string, Primitive>> = [],
) {
  const queryObj: Record<string, string> = {};
  if (query.period) {
    queryObj.period = query.period;
  }
  if (query.date) {
    queryObj.date = formatISO(query.date);
  }
  if (query.from) {
    queryObj.from = formatISO(query.from);
  }
  if (query.to) {
    queryObj.to = formatISO(query.to);
  }
  if (query.filters) {
    queryObj.filters = serializeFilters(query.filters, site);
  }
  if (SHARED_LINK_AUTH) {
    queryObj.auth = SHARED_LINK_AUTH;
  }
  Object.assign(queryObj, ...extraSearchParameter);

  return '?' + serialize(queryObj);
}

export function getStats(
  url: string,
  site: Site,
  query: Partial<Query> = {},
  ...extraSearchParameter: Array<Record<string, Primitive>>
) {
  const headers: Record<string, string> = SHARED_LINK_AUTH
    ? { 'X-Shared-Link-Auth': SHARED_LINK_AUTH }
    : {};
  url += serializeQuery(query, site, extraSearchParameter);
  return fetch(url, {
    signal: abortController.signal,
    headers: headers,
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((msg) => {
        throw new ApiError(msg.error);
      });
    }
    return response.json();
  });
}
