import clsx from 'clsx';
import React from 'react';

import { Link } from '../../../../components/link';
import { ANALYTICS_DOMAIN } from 'utils';

import * as api from '../../analytics-api';
import styles from '../../analytics.module.scss';
import numberFormatter from '../../number-formatter';
import { Query } from '../../query';
import * as storage from '../../storage';
import { BreakDownItem, Goal, Site } from '../../type';
import Bar from '../bar';

const MOBILE_UPPER_WIDTH = 767;
const DEFAULT_WIDTH = 1080;

// https://stackoverflow.com/a/43467144
function isValidHttpUrl(string: string) {
  let url;

  try {
    url = new URL(string);
  } catch {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

export interface PropertyBreakdownProps {
  goal: Goal;
  query: Query;
  site: Site;
}

interface PropertyBreakdownState {
  viewport: number;
  loading: boolean;
  propKey: string;
  page: number;
  moreResultsAvailable: boolean;
  breakdown: BreakDownItem[];
}

export default class PropertyBreakdown extends React.Component<
  PropertyBreakdownProps,
  PropertyBreakdownState
> {
  storageKey: string;
  constructor(props: PropertyBreakdownProps) {
    super(props);
    let propKey = props.goal.prop_names[0];
    this.storageKey = 'goalPropTab__' + props.site.domain + props.goal.name;
    const storedKey = storage.getItem(this.storageKey);
    if (props.goal.prop_names.includes(storedKey)) {
      propKey = storedKey;
    }
    if (props.query.filters['props']) {
      propKey = Object.keys(props.query.filters['props'])[0];
    }

    this.state = {
      loading: true,
      propKey: propKey,
      viewport: DEFAULT_WIDTH,
      breakdown: [],
      page: 1,
      moreResultsAvailable: false,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize, false);

    this.handleResize();
    this.fetchPropBreakdown();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false);
  }

  handleResize = () => {
    this.setState({ viewport: window.innerWidth });
  };

  getBarMaxWidth() {
    const { viewport } = this.state;
    return viewport > MOBILE_UPPER_WIDTH ? '16rem' : '10rem';
  }

  fetchPropBreakdown() {
    if (this.props.query.filters['goal']) {
      api
        .getStats(
          `/api/stats/${ANALYTICS_DOMAIN}/property/${encodeURIComponent(
            this.state.propKey,
          )}`,
          this.props.site,
          this.props.query,
          { limit: 100, page: this.state.page },
        )
        .then((res) =>
          this.setState((state) => ({
            loading: false,
            breakdown: [...state.breakdown, ...res],
            moreResultsAvailable: res.length === 100,
          })),
        );
    }
  }

  loadMore() {
    this.setState(
      { loading: true, page: this.state.page + 1 },
      this.fetchPropBreakdown.bind(this),
    );
  }

  renderUrl(value: BreakDownItem) {
    if (isValidHttpUrl(value.name)) {
      return (
        <a
          target="_blank"
          href={value.name}
          rel="noreferrer"
          className="hidden group-hover:block"
        >
          <svg
            className="ml-1 -mt-1 inline h-4 w-4 text-gray-600 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
          </svg>
        </a>
      );
    }
    return null;
  }

  renderPropContent(value: BreakDownItem, query: URLSearchParams) {
    return (
      <span className="group relative z-9 flex break-all px-2 py-1.5 dark:text-gray-300">
        <Link
          disabled
          href={window.location.pathname + '?' + query.toString()}
          className="block hover:underline md:truncate"
        >
          {value.name}
        </Link>
        {this.renderUrl(value)}
      </span>
    );
  }

  renderPropValue(value: BreakDownItem) {
    const query = new URLSearchParams(window.location.search);
    query.set('props', JSON.stringify({ [this.state.propKey]: value.name }));
    const { viewport, breakdown } = this.state;

    return (
      <div className="my-2 flex items-center justify-between" key={value.name}>
        <Bar
          count={value.unique_conversions}
          all={breakdown}
          color="red"
          maxWidthDeduction={this.getBarMaxWidth()}
        >
          {this.renderPropContent(value, query)}
        </Bar>
        <div className="dark:text-gray-200">
          <span className="inline-block w-20 text-right font-medium">
            {numberFormatter(value.unique_conversions)}
          </span>
          {viewport > MOBILE_UPPER_WIDTH ? (
            <span className="inline-block w-20 text-right font-medium">
              {numberFormatter(value.total_conversions)}
            </span>
          ) : null}
          <span className="inline-block w-20 text-right font-medium">
            {numberFormatter(value.conversion_rate)}%
          </span>
        </div>
      </div>
    );
  }

  changePropKey = (newKey: string) => {
    storage.setItem(this.storageKey, newKey);
    this.setState(
      {
        propKey: newKey,
        loading: true,
        breakdown: [],
        page: 1,
        moreResultsAvailable: false,
      },
      this.fetchPropBreakdown,
    );
  };

  renderLoading() {
    if (this.state.loading) {
      return (
        <div className="px-4 py-2">
          <div className={clsx('mx-auto', styles.loading, styles.sm)}>
            <div></div>
          </div>
        </div>
      );
    } else if (this.state.moreResultsAvailable) {
      return (
        <div className="my-4 w-full text-center">
          <button
            onClick={this.loadMore.bind(this)}
            type="button"
            className="button"
          >
            Load more
          </button>
        </div>
      );
    }
  }

  renderBody() {
    return this.state.breakdown.map((propValue) =>
      this.renderPropValue(propValue),
    );
  }

  renderPill = (key: string) => {
    const isActive = this.state.propKey === key;

    return isActive ? (
      <li
        key={key}
        className="active-prop-heading mr-2 inline-block h-5 font-bold text-indigo-700 dark:text-indigo-500"
      >
        {key}
      </li>
    ) : (
      <li
        key={key}
        className="mr-2 cursor-pointer hover:text-indigo-600"
        onClick={() => this.changePropKey(key)}
      >
        {key}
      </li>
    );
  };

  render() {
    return (
      <div className="mt-4 w-full pl-3 sm:pl-6">
        <div className="flex flex-col items-center pb-1 sm:flex-row">
          <span className="mb-1 self-start text-xs font-bold text-gray-600 dark:text-gray-300 sm:mb-0 sm:self-auto">
            Breakdown by:
          </span>
          <ul className="flex flex-wrap pl-1 text-xs font-medium leading-5 text-gray-500 dark:text-gray-400 sm:pl-2">
            {this.props.goal.prop_names.map((element) =>
              this.renderPill(element),
            )}
          </ul>
        </div>
        {this.renderBody()}
        {this.renderLoading()}
      </div>
    );
  }
}
