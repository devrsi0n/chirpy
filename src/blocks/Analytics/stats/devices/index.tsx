import React from 'react';
import 'twin.macro';

import * as api from '../../api';
import * as storage from '../../storage';
import { cardTitle, tabContainer } from '../../styles';
import { Props } from '../../type';
import * as url from '../../url';
import ListReport from '../reports/list';

function Browsers({ query, site }: Props) {
  function fetchData() {
    return api.get(url.apiPath(site, '/browsers'), query);
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
    return api.get(url.apiPath(site, '/browser-versions'), query);
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
    return api.get(url.apiPath(site, '/operating-systems'), query);
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
    return api.get(url.apiPath(site, '/operating-system-versions'), query);
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
    return api.get(url.apiPath(site, '/screen-sizes'), query);
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
          className="-mt-px feather"
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
          className="-mt-px feather"
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
          className="-mt-px feather"
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
          className="-mt-px feather"
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

export interface DevicesProps extends Props {
  //
}

type Mode = 'size' | 'browser' | 'os' | 'size';
interface DeviceState {
  mode: Mode;
}

export default class Devices extends React.Component<DevicesProps, DeviceState> {
  tabKey: string;
  constructor(props: DevicesProps) {
    super(props);
    this.tabKey = `deviceTab__${props.site.domain}`;
    const storedTab = storage.getItem(this.tabKey);
    this.state = {
      mode: storedTab || 'size',
    };
  }

  setMode(mode: any) {
    return () => {
      storage.setItem(this.tabKey, mode);
      this.setState({ mode });
    };
  }

  renderContent() {
    switch (this.state.mode) {
      case 'browser':
        if (this.props.query.filters.browser) {
          return <BrowserVersions site={this.props.site} query={this.props.query} />;
        }
        return <Browsers site={this.props.site} query={this.props.query} />;
      case 'os':
        if (this.props.query.filters.os) {
          return <OperatingSystemVersions site={this.props.site} query={this.props.query} />;
        }
        return <OperatingSystems site={this.props.site} query={this.props.query} />;
      case 'size':
      default:
        return <ScreenSizes site={this.props.site} query={this.props.query} />;
    }
  }

  renderPill(name: string, mode: Mode) {
    const isActive = this.state.mode === mode;

    if (isActive) {
      return (
        <li className="inline-block h-5 font-bold text-indigo-700 active-prop-heading dark:text-indigo-500">
          {name}
        </li>
      );
    }

    return (
      <li className="cursor-pointer hover:text-indigo-600" onClick={this.setMode(mode)}>
        {name}
      </li>
    );
  }

  render() {
    return (
      <div className="stats-item flex flex-col mt-6 stats-item--has-header w-full">
        <div className="stats-item-header flex flex-col flex-grow relative p-4 bg-white rounded shadow-xl dark:bg-gray-825">
          <div className="flex justify-between w-full">
            <h3 css={cardTitle}>Devices</h3>
            <ul css={tabContainer}>
              {this.renderPill('Size', 'size')}
              {this.renderPill('Browser', 'browser')}
              {this.renderPill('OS', 'os')}
            </ul>
          </div>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}
