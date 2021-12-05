import { Primitive } from 'type-fest';

import { ssrMode } from '$/utilities/env';

import { formatISO } from './date';
import { Query } from './query';

let abortController = ssrMode ? ({} as any) : new AbortController();
let SHARED_LINK_AUTH: string | null = null;

class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

function serialize(obj: Record<string, any>) {
  var str = [];
  /* eslint-disable-next-line no-prototype-builtins */
  for (var p in obj)
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

function serializeFilters(filters: Record<string, any>) {
  const cleaned: Record<string, any> = {};
  Object.entries(filters).forEach(([key, val]) => (val ? (cleaned[key] = val) : null));
  return JSON.stringify(cleaned);
}

export function serializeQuery(
  query: Partial<Query>,
  extraQuery: Array<Record<string, Primitive>> = [],
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
    queryObj.filters = serializeFilters(query.filters);
  }
  if (SHARED_LINK_AUTH) {
    queryObj.auth = SHARED_LINK_AUTH;
  }
  Object.assign(queryObj, ...extraQuery);

  return '?' + serialize(queryObj);
}

export function get(
  url: string,
  query: Partial<Query> = {},
  ...extraQuery: Array<Record<string, Primitive>>
) {
  const headers: Record<string, string> = SHARED_LINK_AUTH
    ? { 'X-Shared-Link-Auth': SHARED_LINK_AUTH }
    : {
        Authorization: `Bearer ZUjCQGz8MoiQt40VB-WvzZyV7d_lJSlLBSNxwQYo1DOf0vWfkTisLadB3MsdL2FU`,
      };
  url = url + serializeQuery(query, extraQuery);
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
