import { NextRouter, useRouter } from 'next/router';
import React from 'react';
import { Primitive, ValueOf } from 'type-fest';

import { Link } from '$/components/link';

import { formatDay, formatMonthYYYY, nowForSite, parseUTCDate } from './date';
import * as storage from './storage';
import { Site } from './type';

const PERIODS = ['realtime', 'day', 'month', '7d', '30d', '6mo', '12mo', 'custom'] as const;

export type Query = {
  period: string;
  date: Date;
  from: Date | undefined;
  to: Date | undefined;
  filters: Filters;
};

export type Filters = {
  goal?: string | null;
  props?: any;
  source?: string | null;
  utm_medium?: string | null;
  utm_source?: string | null;
  utm_campaign?: string | null;
  referrer?: string | null;
  screen?: string | null;
  browser?: string | null;
  browser_version?: string | null;
  os?: string | null;
  os_version?: string | null;
  country?: string | null;
  region?: string | null;
  city?: string | null;
  page?: string | null;
  entry_page?: string | null;
  exit_page?: string | null;
};

export function parseQuery(querystring: string, site: Site): Query {
  const q = new URLSearchParams(querystring);
  let period = q.get('period') as typeof PERIODS[number];
  const periodKey = `period__${site.domain}`;

  if (PERIODS.includes(period)) {
    if (period !== 'custom' && period !== 'realtime') storage.setItem(periodKey, period);
  } else if (storage.getItem(periodKey)) {
    period = storage.getItem(periodKey);
  } else {
    period = '30d';
  }

  return {
    period,
    date: q.get('date') ? parseUTCDate(q.get('date')!) : nowForSite(site),
    from: q.get('from') ? parseUTCDate(q.get('from')!) : undefined,
    to: q.get('to') ? parseUTCDate(q.get('to')!) : undefined,
    filters: {
      goal: q.get('goal'),
      props: JSON.parse(q.get('props')!),
      source: q.get('source'),
      utm_medium: q.get('utm_medium'),
      utm_source: q.get('utm_source'),
      utm_campaign: q.get('utm_campaign'),
      referrer: q.get('referrer'),
      screen: q.get('screen'),
      browser: q.get('browser'),
      browser_version: q.get('browser_version'),
      os: q.get('os'),
      os_version: q.get('os_version'),
      country: q.get('country'),
      region: q.get('region'),
      city: q.get('city'),
      page: q.get('page'),
      entry_page: q.get('entry_page'),
      exit_page: q.get('exit_page'),
    },
  };
}

export type FilterPair = [keyof Filters, ValueOf<Filters>];
export type FilterPairArray = Array<FilterPair>;

export function appliedFilters(query: Query): FilterPairArray {
  return (Object.keys(query.filters) as Array<keyof Filters>)
    .map((key: keyof Filters) => [key, query.filters[key]])
    .filter(([_key, value]) => !!value) as FilterPairArray;
}

function generateHref(data: { [x: string]: Primitive }) {
  const url = new URL(window.location.href);
  Object.keys(data).forEach((key) => {
    if (!data[key]) {
      url.searchParams.delete(key);
      return;
    }

    url.searchParams.set(key, String(data[key]));
  });
  return url.href;
}

export function navigateToQuery(
  router: NextRouter,
  queryFrom: Query,
  newData: { [x: string]: Primitive },
) {
  // if we update any data that we store in localstorage, make sure going back in history will
  // revert them
  if (newData.period && newData.period !== queryFrom.period) {
    const url = new URL(window.location.href);
    url.searchParams.set('period', queryFrom.period);
    router.replace(url.href);
  }

  // then push the new query to the history
  router.push(generateHref(newData));
}

interface QueryLinkProps {
  query: Query;
  to: any;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
  className?: string;
}

function QueryLink({ query, to, onClick, ...restProps }: QueryLinkProps): JSX.Element {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigateToQuery(router, query, to);
    onClick?.(e);
  };
  return (
    <Link disabled {...restProps} href={generateHref(to)} onClick={handleClick} variant="plain" />
  );
}

export { QueryLink };

interface QueryButtonProps {
  router: NextRouter;
  query: Query;
  to: any;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

function QueryButton({
  router,
  query,
  to,
  disabled,
  className,
  children,
  onClick,
}: QueryButtonProps): JSX.Element {
  return (
    <button
      className={className}
      onClick={(event) => {
        event.preventDefault();
        navigateToQuery(router, query, to);
        onClick?.(event);
        router.push(generateHref(to));
      }}
      type="button"
      disabled={disabled}
    >
      {children}
    </button>
  );
}

const QueryButtonWithRouter = QueryButton;
export { QueryButtonWithRouter as QueryButton };

export function toHuman(query: Query) {
  if (query.period === 'day') {
    return `on ${formatDay(query.date)}`;
  }
  if (query.period === 'month') {
    return `in ${formatMonthYYYY(query.date)}`;
  }
  if (query.period === '7d') {
    return 'in the last 7 days';
  }
  if (query.period === '30d') {
    return 'in the last 30 days';
  }
  if (query.period === '6mo') {
    return 'in the last 6 months';
  }
  if (query.period === '12mo') {
    return 'in the last 12 months';
  }
  return '';
}

export function eventName(query: Query) {
  if (query.filters.goal) {
    if (query.filters.goal.startsWith('Visit ')) {
      return 'pageviews';
    }
    return 'events';
  }
  return 'pageviews';
}

//@ts-ignore
export const formattedFilters: Record<FilterKey, string> = {
  // goal: 'Goal',
  // props: 'Goal properties',
  source: 'Source',
  utm_medium: 'UTM Medium',
  utm_source: 'UTM Source',
  utm_campaign: 'UTM Campaign',
  referrer: 'Referrer URL',
  screen: 'Screen size',
  browser: 'Browser',
  browser_version: 'Browser Version',
  os: 'Operating System',
  os_version: 'Operating System Version',
  country: 'Country',
  region: 'Region',
  city: 'City',
  // page: 'Page',
  entry_page: 'Entry Page',
  exit_page: 'Exit Page',
} as const;

export type FilterKey = keyof Filters;
