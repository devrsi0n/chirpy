import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { NextRouter, useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';

import { Button } from '$/components/button';
import { IconEdit2, IconX } from '$/components/icons';
import { Link } from '$/components/link';

import { appliedFilters, navigateToQuery, formattedFilters, Query, FilterPair } from './query';
import {
  FILTER_GROUPS,
  formatFilterGroup,
  filterGroupForFilter,
  FilterGroupKey,
} from './stats/modals/filter';
import { Site } from './type';

function removeFilter(router: NextRouter, key: string, query: any) {
  const newOpts: any = {
    [key]: false,
  };
  if (key === 'goal') {
    newOpts.props = false;
  }
  if (key === 'country') {
    newOpts.country_name = false;
  }
  if (key === 'region') {
    newOpts.region_name = false;
  }
  if (key === 'city') {
    newOpts.city_name = false;
  }

  navigateToQuery(router, query, newOpts);
}

function clearAllFilters(router: NextRouter, query: Query) {
  // eslint-disable-next-line unicorn/prefer-object-from-entries
  const newOpts = Object.keys(query.filters).reduce((acc, red) => ({ ...acc, [red]: false }), {});
  navigateToQuery(router, query, newOpts);
}

function filterType(val: string) {
  if (typeof val === 'string' && val.startsWith('!')) {
    return ['is not', val.slice(1)];
  }

  return ['is', val];
}

function filterText(key: keyof typeof formattedFilters, rawValue: string, query: Query) {
  const [type, value] = filterType(rawValue);

  if (key === 'goal') {
    return (
      <>
        Completed goal <b>{value}</b>
      </>
    );
  }
  if (key === 'props') {
    const [metaKey, metaValue] = Object.entries(value)[0];
    const eventName = query.filters.goal ? query.filters.goal : 'event';
    return (
      <>
        {eventName}.{metaKey} is <strong>{metaValue}</strong>
      </>
    );
  }
  if (key === 'browser_version') {
    const browserName = query.filters.browser ? query.filters.browser : 'Browser';
    return (
      <>
        {browserName}.Version {type} <strong>{value}</strong>
      </>
    );
  }
  if (key === 'os_version') {
    const osName = query.filters.os ? query.filters.os : 'OS';
    return (
      <>
        {osName}.Version {type} <strong>{value}</strong>
      </>
    );
  }
  if (key === 'country') {
    const q = new URLSearchParams(window.location.search);
    const countryName = q.get('country_name');
    return (
      <>
        Country {type} <strong>{countryName}</strong>
      </>
    );
  }

  if (key === 'region') {
    const q = new URLSearchParams(window.location.search);
    const regionName = q.get('region_name');
    return (
      <>
        Region {type} <strong>{regionName}</strong>
      </>
    );
  }

  if (key === 'city') {
    const q = new URLSearchParams(window.location.search);
    const cityName = q.get('city_name');
    return (
      <>
        City {type} <strong>{cityName}</strong>
      </>
    );
  }

  const formattedFilter = formattedFilters[key];

  if (formattedFilter) {
    return (
      <>
        {formattedFilter} {type} <strong>{value}</strong>
      </>
    );
  }

  throw new Error(`Unknown filter: ${key}`);
}

function renderDropdownFilter(
  router: NextRouter,
  site: Site,
  [key, value]: FilterPair,
  query: Query,
) {
  if (key === 'props') {
    return (
      <Menu.Item key={key}>
        <div
          className="flex items-center justify-between px-4 py-3 text-sm leading-tight sm:py-2"
          key={key + value}
        >
          <span className="inline-block w-full truncate">{filterText(key, value, query)}</span>
          <strong
            title={`Remove filter: ${formattedFilters[key]}`}
            className="ml-2 cursor-pointer hover:text-indigo-700 dark:hover:text-indigo-500"
            onClick={() => removeFilter(router, key, query)}
          >
            <IconX className="h-4 w-4" />
          </strong>
        </div>
      </Menu.Item>
    );
  }

  return (
    <Menu.Item key={key}>
      <div
        className="flex items-center justify-between px-3 py-3 text-sm leading-tight sm:py-2 md:px-4"
        key={key + value}
      >
        <Link
          disabled
          title={`Edit filter: ${formattedFilters[key]}`}
          href={`/${encodeURIComponent(site.domain)}/filter/${filterGroupForFilter(key)}${
            window.location.search
          }`}
          className="group flex w-full items-center justify-between"
          style={{ width: 'calc(100% - 1.5rem)' }}
          variant="plain"
        >
          <span className="inline-block w-full truncate">{filterText(key, value, query)}</span>
          <IconEdit2 className="ml-1 h-4 w-4 cursor-pointer group-hover:text-indigo-700 dark:group-hover:text-indigo-500" />
        </Link>
        <strong
          title={`Remove filter: ${formattedFilters[key]}`}
          className="ml-2 cursor-pointer hover:text-indigo-700 dark:hover:text-indigo-500"
          onClick={() => removeFilter(router, key, query)}
        >
          <IconX className="h-4 w-4" />
        </strong>
      </div>
    </Menu.Item>
  );
}

function filterDropdownOption(site: Site, option: FilterGroupKey) {
  return (
    <Menu.Item key={option}>
      {({ active }) => (
        <Link
          disabled
          href={`/${encodeURIComponent(site.domain)}/filter/${option}${window.location.search}`}
          className={clsx(
            active ? `bg-gray-100 text-gray-1100` : `text-gray-1100`,
            `block px-4 py-2 text-sm font-medium`,
          )}
        >
          {formatFilterGroup(option)}
        </Link>
      )}
    </Menu.Item>
  );
}

type DropdownContentProps = Pick<FiltersProps, 'query' | 'site'> & Pick<FiltersState, 'wrapped'>;

function DropdownContent({ site, query, wrapped }: DropdownContentProps): JSX.Element {
  const [addingFilter, setAddingFilter] = useState(false);
  const router = useRouter();

  if (wrapped === 0 || addingFilter) {
    return (
      <>
        {(Object.keys(FILTER_GROUPS) as FilterGroupKey[]).map((option: FilterGroupKey) =>
          filterDropdownOption(site, option),
        )}
      </>
    );
  }

  return (
    <>
      <Button
        variant="text"
        className="border-b border-gray-200 px-4 py-3 text-sm leading-tight hover:text-indigo-700 dark:border-gray-500 dark:hover:text-indigo-500 sm:py-2"
        onClick={() => setAddingFilter(true)}
      >
        + Add filter
      </Button>
      {appliedFilters(query).map((filter) => renderDropdownFilter(router, site, filter, query))}
      <Menu.Item key="clear">
        <div
          className="border-t border-gray-200 px-4 py-3 text-sm leading-tight hover:cursor-pointer hover:text-indigo-700 dark:border-gray-500 dark:hover:text-indigo-500 sm:py-2"
          onClick={() => clearAllFilters(router, query)}
        >
          Clear All Filters
        </div>
      </Menu.Item>
    </>
  );
}

export interface FiltersProps {
  className?: string;
  site: Site;
  query: Query;
  router: NextRouter;
}

interface FiltersState {
  viewport: number;
  // 0=unwrapped, 1=waiting to check, 2=wrapped
  wrapped: 0 | 1 | 2;
}

class Filters extends React.Component<FiltersProps, FiltersState> {
  constructor(props: FiltersProps) {
    super(props);

    this.state = {
      wrapped: 1,
      viewport: 1080,
    };

    this.renderDropDown = this.renderDropDown.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
  }

  componentDidMount() {
    // document.addEventListener('mousedown', this.handleClick, false);
    window.addEventListener('resize', this.handleResize, false);
    document.addEventListener('keyup', this.handleKeyup);

    this.handleResize();
    this.rewrapFilters();
  }

  componentDidUpdate(prevProps: FiltersProps, prevState: FiltersState) {
    const { query } = this.props;
    const { viewport, wrapped } = this.state;

    if (
      JSON.stringify(query) !== JSON.stringify(prevProps.query) ||
      viewport !== prevState.viewport
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ wrapped: 1 });
    }

    if (wrapped === 1 && prevState.wrapped !== 1) {
      this.rewrapFilters();
    }
  }

  componentWillUnmount() {
    // document.removeEventListener('mousedown', this.handleClick, false);
    document.removeEventListener('keyup', this.handleKeyup);
    window.removeEventListener('resize', this.handleResize, false);
  }

  handleKeyup(e: KeyboardEvent) {
    const { query, router } = this.props;

    if (e.ctrlKey || e.metaKey || e.altKey) return;

    if (e.key === 'Escape') {
      clearAllFilters(router, query);
    }
  }

  handleResize() {
    this.setState({ viewport: window.innerWidth || 639 });
  }

  // Checks if the filter container is wrapping items
  rewrapFilters() {
    const items = document.querySelector<HTMLElement>('#filters');
    const { wrapped, viewport } = this.state;

    // Always wrap on mobile
    if (appliedFilters(this.props.query).length > 0 && viewport <= 768) {
      this.setState({ wrapped: 2 });
      return;
    }

    this.setState({ wrapped: 0 });

    // Don't rewrap if we're already properly wrapped, there are no DOM children, or there is only filter
    if (wrapped !== 1 || !items || appliedFilters(this.props.query).length === 1) {
      return;
    }

    let prevItem: DOMRect | null = null;

    // For every filter DOM Node, check if its y value is higher than the previous (this indicates a wrap)
    [...(items.childNodes as unknown as HTMLElement[])].forEach((item) => {
      const currItem = item.getBoundingClientRect();
      if (prevItem && prevItem?.top < currItem.top) {
        this.setState({ wrapped: 2 });
      }
      prevItem = currItem;
    });
  }

  renderListFilter([key, value]: FilterPair, query: Query) {
    return (
      <span
        key={key}
        title={value}
        className="mr-2 flex items-center rounded bg-white text-sm text-gray-700 shadow dark:bg-gray-600 dark:text-gray-300"
      >
        {key === 'props' ? (
          <span className="flex h-full w-full items-center py-2 pl-3">
            <span className="inline-block max-w-2xs truncate md:max-w-xs">
              {filterText(key, value, query)}
            </span>
          </span>
        ) : (
          <>
            <Link
              disabled
              title={`Edit filter: ${formattedFilters[key]}`}
              className="flex h-full w-full items-center py-2 pl-3 text-gray-1200"
              href={`/${encodeURIComponent(this.props.site.domain)}/filter/${filterGroupForFilter(
                key,
              )}${window.location.search}`}
              variant="plain"
            >
              <span className="inline-block max-w-2xs truncate md:max-w-xs">
                {filterText(key, value, query)}
              </span>
            </Link>
          </>
        )}
        <span
          title={`Remove filter: ${formattedFilters[key]}`}
          className="flex h-full w-full cursor-pointer items-center px-2 text-gray-800 hover:text-indigo-900"
          onClick={() => removeFilter(this.props.router, key, query)}
        >
          <IconX className="h-4 w-4" />
        </span>
      </span>
    );
  }

  // TODO: Add filter dropdown
  renderDropdownButton() {
    return null;
    // if (this.state.wrapped === 2) {
    //   const filterCount = appliedFilters(this.props.query).length;
    //   return (
    //     <>
    //       <AdjustmentsIcon className="-ml-1 mr-1 h-4 w-4" aria-hidden="true" />
    //       {filterCount} Filter{filterCount === 1 ? '' : 's'}
    //     </>
    //   );
    // }

    // return (
    //   <>
    //     <PlusIcon className="-ml-1 mr-1 h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
    //     {/* This would have been a good use-case for JSX! But in the interest of keeping the breakpoint width logic with TailwindCSS, this is a better long-term way to deal with it. */}
    //     <span className="sm:hidden">Filter</span>
    //     <span className="hidden sm:inline-block">Add filter</span>
    //   </>
    // );
  }

  renderDropDown() {
    const { query, site } = this.props;

    return (
      <Menu as="div" className="ml-auto md:relative">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="ml-auto flex cursor-pointer items-center rounded px-3 py-2 text-xs font-medium leading-tight text-gray-1100 hover:bg-gray-200 dark:hover:bg-gray-900 md:text-sm">
                {this.renderDropdownButton()}
              </Menu.Button>
            </div>

            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="absolute left-0 right-0 z-10 mt-2 w-full origin-top-right md:absolute md:top-auto md:left-auto md:right-0 md:w-72"
              >
                <div
                  className="rounded-md bg-white font-medium text-gray-800 shadow-lg ring-1 ring-black
                  ring-opacity-5 dark:bg-gray-800 dark:text-gray-200"
                >
                  <DropdownContent query={query} site={site} wrapped={this.state.wrapped} />
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    );
  }

  renderFilterList() {
    const { query } = this.props;

    if (this.state.wrapped !== 2) {
      return (
        <div id="filters" className="flex flex-wrap">
          {appliedFilters(query).map((filter) => this.renderListFilter(filter, query))}
        </div>
      );
    }

    return null;
  }

  render() {
    return (
      <>
        {this.renderFilterList()}
        {this.renderDropDown()}
      </>
    );
  }
}

export default Filters;
