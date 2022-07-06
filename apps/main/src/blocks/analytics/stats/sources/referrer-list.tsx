import clsx from 'clsx';
import React from 'react';
import FlipMove from 'react-flip-move';

import { Link } from '$/components/link';
import { ANALYTICS_DOMAIN } from '$/lib/constants';

import * as api from '../../analytics-api';
import styles from '../../analytics.module.scss';
import FadeIn from '../../fade-in';
import LazyLoader from '../../lazy-loader';
import numberFormatter from '../../number-formatter';
import { cardTitle, labelContainer } from '../../styles';
import { Timer } from '../../timer';
import { Props } from '../../type';
import Bar from '../bar';
import { EmptyState } from '../empty-state';
import { ViewNumber } from '../fine-components';
import MoreLink from '../more-link';

interface LinkOptionProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  query: URLSearchParams;
}

function LinkOption({
  disabled,
  children,
  query,
  ...restProps
}: LinkOptionProps) {
  const url = new URL(
    location.origin + location.pathname + '?' + query.toString(),
  ).href;
  return disabled ? (
    <span {...restProps}>{children}</span>
  ) : (
    <Link disabled {...restProps} href={url}>
      {children}
    </Link>
  );
}

export interface ReferrersProps extends Props {
  timer: Timer;
}

export interface Referrer {
  name: string;
  count: number;
  conversion_rate: number;
}

interface ReferrersState {
  referrers: Referrer[] | null;
  loading: boolean;
}

export default class Referrers extends React.Component<
  ReferrersProps,
  ReferrersState
> {
  state: ReferrersState = { loading: true, referrers: null };

  onVisible = () => {
    this.fetchReferrers();
    if (this.props.timer)
      this.props.timer.onTick(this.fetchReferrers.bind(this));
  };

  componentDidUpdate(prevProps: ReferrersProps) {
    if (this.props.query !== prevProps.query) {
      this.setState({ loading: true, referrers: null });
      this.fetchReferrers();
    }
  }

  showNoRef() {
    return this.props.query.period === 'realtime';
  }

  showConversionRate() {
    return !!this.props.query.filters.goal;
  }

  fetchReferrers() {
    if (this.props.query.filters.source) {
      api
        .getStats(
          `/api/stats/${ANALYTICS_DOMAIN}/referrers/${encodeURIComponent(
            this.props.query.filters.source,
          )}`,
          this.props.site,
          this.props.query,
          { show_noref: this.showNoRef() },
        )
        .then((res) => res.search_terms || res.referrers)
        .then((referrers) =>
          this.setState({ loading: false, referrers: referrers }),
        );
    } else if (this.props.query.filters.goal) {
      api
        .getStats(
          `/api/stats/${ANALYTICS_DOMAIN}/goal/referrers`,
          this.props.site,
          this.props.query,
        )
        .then((res) => this.setState({ loading: false, referrers: res }));
    } else {
      api
        .getStats(
          `/api/stats/${ANALYTICS_DOMAIN}/referrers`,
          this.props.site,
          this.props.query,
          {
            show_noref: this.showNoRef(),
          },
        )
        .then((res) => this.setState({ loading: false, referrers: res }));
    }
  }

  renderExternalLink(referrer: Referrer) {
    if (
      this.props.query.filters.source &&
      this.props.query.filters.source !== 'Google' &&
      referrer.name !== 'Direct / None'
    ) {
      return (
        <a
          target="_blank"
          href={'//' + referrer.name}
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

  renderReferrer(referrer: Referrer) {
    const maxWidthDeduction = this.showConversionRate() ? '10rem' : '5rem';
    const query = new URLSearchParams(window.location.search);
    query.set('referrer', referrer.name);

    return (
      <div
        className="my-1 flex items-center justify-between text-sm"
        key={referrer.name}
      >
        <Bar
          count={referrer.count}
          all={this.state.referrers!}
          color="blue"
          maxWidthDeduction={maxWidthDeduction}
        >
          <span className="group relative z-9 flex break-all px-2 py-1.5">
            <LinkOption
              className="block dark:text-gray-300 md:truncate"
              query={query}
              disabled={referrer.name === 'Direct / None'}
            >
              <img
                src={`${
                  process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN
                }/favicon/sources/${encodeURIComponent(referrer.name)}`}
                referrerPolicy="no-referrer"
                className="mr-2 -mt-px inline h-4 w-4 align-middle"
                alt={`Favorite icon for ${referrer.name}`}
              />
              {referrer.name}
            </LinkOption>
            {this.renderExternalLink(referrer)}
          </span>
        </Bar>
        <span className="font-medium dark:text-gray-200">
          {numberFormatter(referrer.count)}
        </span>
        {this.showConversionRate() && (
          <ViewNumber>{referrer.conversion_rate}%</ViewNumber>
        )}
      </div>
    );
  }

  label() {
    if (this.props.query.period === 'realtime') {
      return 'Current visitors';
    }

    if (this.showConversionRate()) {
      return 'Conversions';
    }

    return 'Visitors';
  }

  renderList() {
    if (this.state.referrers!.length > 0) {
      return (
        <div className="flex flex-grow flex-col">
          <div className={labelContainer}>
            <span>Referrer</span>
            <div className="text-right">
              <span className="inline-block w-20">{this.label()}</span>
              {this.showConversionRate() && (
                <span className="inline-block w-20">CR</span>
              )}
            </div>
          </div>
          {/* @ts-ignore */}
          <FlipMove className="flex-grow">
            {this.state.referrers!.map(this.renderReferrer.bind(this))}
          </FlipMove>
        </div>
      );
    }
    return <EmptyState />;
  }

  renderContent() {
    if (this.state.referrers) {
      return (
        <React.Fragment>
          {this.renderList()}
          <MoreLink
            site={this.props.site}
            list={this.state.referrers}
            endpoint={`referrers/${this.props.query.filters.source}`}
          />
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <div
        className={clsx(
          'relative mt-6 flex w-full flex-col rounded bg-white p-4 shadow-xl dark:bg-gray-825',
          styles['stats-item'],
        )}
      >
        <LazyLoader
          onVisible={this.onVisible}
          className="flex flex-grow flex-col"
        >
          <h3 className={cardTitle}>Top Referrers</h3>
          {this.state.loading && (
            <div className={clsx('mx-auto mt-44', styles.loading)}>
              <div></div>
            </div>
          )}
          <FadeIn show={!this.state.loading}>{this.renderContent()}</FadeIn>
        </LazyLoader>
      </div>
    );
  }
}
