import clsx from 'clsx';
import React from 'react';

import { Tabs } from '@chirpy/components';

import * as api from '../../analytics-api';
import styles from '../../analytics.module.scss';
import { Props } from '../../type';
import * as url from '../../url';
import { AnalyticsCard } from '../fine-components';
import ListReport from '../reports/list';

export interface DevicesProps extends Props {
  //
}

export default function Devices(props: DevicesProps): JSX.Element {
  return (
    <AnalyticsCard>
      <Tabs
        cacheKey="analytics.devices"
        initialValue="browser"
        leftItem={<h3 className="font-bold text-gray-1100">Devices</h3>}
      >
        <Tabs.Item label="Size" value="size">
          <ScreenSizes site={props.site} query={props.query} />
        </Tabs.Item>
        <Tabs.Item label="Browser" value="browser">
          {props.query.filters.browser ? (
            <BrowserVersions site={props.site} query={props.query} />
          ) : (
            <Browsers site={props.site} query={props.query} />
          )}
        </Tabs.Item>
        <Tabs.Item label="OS" value="os">
          {props.query.filters.os ? (
            <OperatingSystemVersions site={props.site} query={props.query} />
          ) : (
            <OperatingSystems site={props.site} query={props.query} />
          )}
        </Tabs.Item>
      </Tabs>
    </AnalyticsCard>
  );
}

function Browsers({ query, site }: Props) {
  function fetchData() {
    return api.getStats(url.apiPath(site, '/browsers'), site, query);
  }

  return (
    <ListReport
      fetchData={fetchData}
      filter={{ browser: 'name' }}
      keyLabel="Browser"
      query={query}
    />
  );
}

function BrowserVersions({ query, site }: Props) {
  function fetchData() {
    return api.getStats(url.apiPath(site, '/browser-versions'), site, query);
  }

  return (
    <ListReport
      fetchData={fetchData}
      filter={{ browser_version: 'name' }}
      keyLabel={query.filters.browser + ' version'}
      query={query}
    />
  );
}

function OperatingSystems({ query, site }: Props) {
  function fetchData() {
    return api.getStats(url.apiPath(site, '/operating-systems'), site, query);
  }

  return (
    <ListReport
      fetchData={fetchData}
      filter={{ os: 'name' }}
      keyLabel="Operating system"
      query={query}
    />
  );
}

function OperatingSystemVersions({ query, site }: Props) {
  function fetchData() {
    return api.getStats(url.apiPath(site, '/operating-system-versions'), site, query);
  }

  return (
    <ListReport
      fetchData={fetchData}
      filter={{ os_version: 'name' }}
      keyLabel={query.filters.os + ' version'}
      query={query}
    />
  );
}

interface ScreenSize {
  name: keyof typeof EXPLANATION;
}

function renderIcon(screenSize: ScreenSize) {
  return iconFor(screenSize.name);
}

function renderTooltipText(screenSize: ScreenSize) {
  return EXPLANATION[screenSize.name];
}

function ScreenSizes({ query, site }: Props) {
  function fetchData() {
    return api.getStats(url.apiPath(site, '/screen-sizes'), site, query);
  }

  return (
    <ListReport
      fetchData={fetchData}
      filter={{ screen: 'name' }}
      keyLabel="Screen size"
      query={query}
      renderIcon={renderIcon}
      tooltipText={renderTooltipText}
    />
  );
}

const EXPLANATION = {
  Mobile: 'up to 576px',
  Tablet: '576px to 992px',
  Laptop: '992px to 1440px',
  Desktop: 'above 1440px',
} as const;

function iconFor(screenSize: 'Mobile' | 'Tablet' | 'Laptop' | 'Desktop') {
  switch (screenSize) {
    case 'Mobile': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={clsx('-mt-px', styles.feather)}
        >
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12" y2="18" />
        </svg>
      );
    }
    case 'Tablet': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={clsx('-mt-px', styles.feather)}
        >
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" transform="rotate(180 12 12)" />
          <line x1="12" y1="18" x2="12" y2="18" />
        </svg>
      );
    }
    case 'Laptop': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={clsx('-mt-px', styles.feather)}
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      );
    }
    case 'Desktop': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={clsx('-mt-px', styles.feather)}
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    }
    // No default
  }
}
