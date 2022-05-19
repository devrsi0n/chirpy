// @ts-nocheck
import { Transition } from '@headlessui/react';
import React from 'react';

import { getStats } from './analytics-api';
import { Site } from './type';

export interface SiteSwitcherProps {
  site: Site;
  loggedIn: boolean;
  currentUserRole: string;
}

export default class SiteSwitcher extends React.Component<SiteSwitcherProps> {
  constructor(props: SiteSwitcherProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.populateSites = this.populateSites.bind(this);
    this.state = {
      open: false,
      sites: null,
      error: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.populateSites();
    document.addEventListener('keydown', this.handleKeydown);
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  populateSites() {
    if (!this.props.loggedIn) return;

    getStats('/api/sites', this.props.site)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((sites) => this.setState({ loading: false, sites: sites }))
      .catch((error: Error) => this.setState({ loading: false, error }));
  }

  handleClick(e) {
    if (this.dropDownNode && this.dropDownNode.contains(e.target)) return;
    if (!this.state.open) return;

    this.setState({ open: false });
  }

  handleKeydown(e) {
    const { site } = this.props;
    const { sites } = this.state;

    if (e.target.tagName === 'INPUT') return true;
    if (e.ctrlKey || e.metaKey || e.altKey || e.isComposing || e.keyCode === 229 || !sites) return;

    const siteNum = Number.parseInt(e.key);

    if (
      1 <= siteNum &&
      siteNum <= 9 &&
      siteNum <= sites.length &&
      sites[siteNum - 1] !== site.domain
    ) {
      window.location = `/${encodeURIComponent(sites[siteNum - 1])}`;
    }
  }

  toggle() {
    if (!this.props.loggedIn) return;

    this.setState({ open: !this.state.open });

    if (!this.state.sites) {
      this.populateSites();
    }
  }

  renderSiteLink(domain, index) {
    const extraClass =
      domain === this.props.site.domain
        ? 'font-medium text-gray-900 dark:text-gray-100 cursor-default font-bold'
        : 'hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-900 dark:focus:text-gray-100';
    return (
      <a
        href={domain === this.props.site.domain ? '' : `/${encodeURIComponent(domain)}`}
        key={domain}
        className={`flex items-center justify-between truncate px-4 py-2 leading-5 text-gray-700 dark:text-gray-300 md:text-sm ${extraClass}`}
      >
        <span>
          <img
            src={`${process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN}/favicon/sources/${encodeURIComponent(
              domain,
            )}`}
            className="mr-2 inline w-4 align-middle"
            alt={`Favorite icon for ${domain}`}
          />
          <span className="inline-block max-w-3xs truncate pr-2 align-middle">{domain}</span>
        </span>
        {index < 9 && <span>{index + 1}</span>}
      </a>
    );
  }

  renderSettingsLink() {
    if (['owner', 'admin'].includes(this.props.currentUserRole)) {
      return (
        <React.Fragment>
          <div className="py-1">
            <a
              href={`/${encodeURIComponent(this.props.site.domain)}/settings`}
              className="focus:outline-none group flex items-center px-4 py-2 leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-100 dark:focus:bg-gray-900 dark:focus:text-gray-100 md:text-sm"
              role="menuitem"
            >
              <svg
                className="mr-2 h-4 w-4 text-gray-500 group-hover:text-gray-600 group-focus:text-gray-500 dark:text-gray-200 dark:group-hover:text-gray-400 dark:group-focus:text-gray-200"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Site settings
            </a>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-500"></div>
        </React.Fragment>
      );
    }
  }

  renderDropdown() {
    if (this.state.loading) {
      return (
        <div className="px-4 py-6">
          <div className={clsx('mx-auto', styles.loading, styles.sm)}>
            <div></div>
          </div>
        </div>
      );
    } else if (this.state.error) {
      return (
        <div className="mx-auto px-4 py-6 dark:text-gray-100">Something went wrong, try again</div>
      );
    } else {
      return (
        <React.Fragment>
          {this.renderSettingsLink()}
          <div className="py-1">{this.state.sites.map(this.renderSiteLink.bind(this))}</div>
          <div className="border-t border-gray-200 dark:border-gray-500"></div>
          <div className="py-1">
            <a
              href="/sites/new"
              className="focus:outline-none group flex items-center px-4 py-2 leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-100 dark:focus:bg-gray-900 dark:focus:text-gray-100 md:text-sm"
              role="menuitem"
            >
              <svg
                className="mr-2 h-4 w-4 text-gray-500 group-hover:text-gray-600 group-focus:text-gray-500 dark:text-gray-200 dark:group-hover:text-gray-400 dark:group-focus:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              Add Site
            </a>
          </div>
        </React.Fragment>
      );
    }
  }

  renderArrow() {
    if (this.props.loggedIn) {
      return (
        <svg className="-mr-1 ml-1 h-5 w-5 md:ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
  }

  render() {
    const hoverClass = this.props.loggedIn
      ? 'hover:text-gray-500 dark:hover:text-gray-200 focus:border-blue-300 focus:ring '
      : 'cursor-default';

    return (
      <div className="relative mr-2 inline-block text-left sm:mr-4">
        <button
          onClick={this.toggle.bind(this)}
          className={`focus:outline-none inline-flex w-full items-center rounded-md py-2 font-bold leading-5 text-gray-700 transition duration-150 ease-in-out dark:text-gray-300 md:text-lg ${hoverClass}`}
        >
          <img
            src={`https://icons.duckduckgo.com/ip3/${this.props.site.domain}.ico`}
            onError={(e) => {
              // eslint-disable-next-line unicorn/prefer-add-event-listener
              e.target.onerror = null;
              e.target.src = 'https://icons.duckduckgo.com/ip3/placeholder.ico';
            }}
            referrerPolicy="no-referrer"
            className="mr-1 inline w-4 align-middle md:mr-2"
            alt={`Icon of ${this.props.site.domain}`}
          />
          <span className="hidden sm:inline-block">{this.props.site.domain}</span>
          {this.renderArrow()}
        </button>

        <Transition
          show={this.state.open}
          enter="transition ease-out duration-100"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className="absolute left-0 mt-2 w-64 origin-top-left rounded-md shadow-lg"
            ref={(node) => (this.dropDownNode = node)}
          >
            <div className="rounded-md bg-white ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
              {this.renderDropdown()}
            </div>
          </div>
        </Transition>
      </div>
    );
  }
}
