import { ANALYTICS_DOMAIN } from '@chirpy-dev/utils';
import clsx from 'clsx';
import React from 'react';

import * as api from '../../analytics-api';
import styles from '../../analytics.module.scss';
import FadeIn from '../../fade-in';
import numberFormatter from '../../number-formatter';
import { cardTitle } from '../../styles';
import { Props } from '../../type';
import Bar from '../bar';
import RocketIcon from '../modals/rocket-icon';
import MoreLink from '../more-link';

export interface SearchTermsProps extends Props {}

interface SearchTermsState {
  loading: boolean;
  notConfigured: boolean;
  searchTerms: Term[] | null;
  isAdmin: boolean;
}

interface Term {
  name: string;
  visitors: number;
}

export default class SearchTerms extends React.Component<
  SearchTermsProps,
  SearchTermsState
> {
  state: SearchTermsState = {
    loading: true,
    searchTerms: null,
    isAdmin: false,
    notConfigured: false,
  };

  componentDidMount() {
    this.fetchSearchTerms();
  }

  componentDidUpdate(prevProps: SearchTermsProps) {
    if (this.props.query !== prevProps.query) {
      this.setState({ loading: true });
      this.fetchSearchTerms();
    }
  }

  fetchSearchTerms() {
    api
      .getStats(
        `/api/stats/${ANALYTICS_DOMAIN}/referrers/Google`,
        this.props.site,
        this.props.query,
      )
      .then((res) =>
        this.setState({
          loading: false,
          searchTerms: res.search_terms || [],
          notConfigured: res.not_configured,
          isAdmin: res.is_admin,
        }),
      );
  }

  renderSearchTerm(term: Term) {
    return (
      <div
        className="my-1 flex items-center justify-between text-sm"
        key={term.name}
      >
        <Bar
          count={term.visitors}
          all={this.state.searchTerms!}
          color="blue"
          maxWidthDeduction="4rem"
        >
          <span className="relative z-9 flex break-all px-2 py-1.5 dark:text-gray-300">
            <span className="block md:truncate">{term.name}</span>
          </span>
        </Bar>
        <span className="font-medium dark:text-gray-200">
          {numberFormatter(term.visitors)}
        </span>
      </div>
    );
  }

  renderList() {
    if (this.props.query.filters.goal) {
      return (
        <div className="mt-20 text-center text-sm text-gray-700 dark:text-gray-300">
          <RocketIcon />
          <div>
            Sorry, we cannot show which keywords converted best for goal{' '}
            <b>{this.props.query.filters.goal}</b>
          </div>
          <div>Google does not share this information</div>
        </div>
      );
    } else if (this.state.notConfigured) {
      return (
        <div className="mt-20 text-center text-sm text-gray-700 dark:text-gray-300">
          <RocketIcon />
          <div>The site is not connected to Google Search Keywords</div>
          <div>Cannot show search terms</div>
          {this.state.isAdmin && (
            <a
              href={`/${encodeURIComponent(
                this.props.site.domain,
              )}/settings/search-console`}
              className="button mt-4"
            >
              Connect with Google
            </a>
          )}
        </div>
      );
    } else if (this.state.searchTerms!.length > 0) {
      const valLabel =
        this.props.query.period === 'realtime'
          ? 'Current visitors'
          : 'Visitors';

      return (
        <React.Fragment>
          <div className="mt-3 mb-2 flex items-center justify-between text-xs font-bold tracking-wide text-gray-500 dark:text-gray-400">
            <span>Search term</span>
            <span>{valLabel}</span>
          </div>

          {this.state.searchTerms!.map((element) =>
            this.renderSearchTerm(element),
          )}
        </React.Fragment>
      );
    } else {
      return (
        <div className="mt-20 text-center text-sm text-gray-700 dark:text-gray-300">
          <RocketIcon />
          <div>Could not find any search terms for this period</div>
          <div>Google Search Console data is sampled and delayed by 24-36h</div>
          <div>
            Read more on{' '}
            <a
              href="https://docs.plausible.io/google-search-console-integration/#i-dont-see-google-search-query-data-in-my-dashboard"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-700 hover:underline dark:text-indigo-500"
            >
              our documentation
            </a>
          </div>
        </div>
      );
    }
  }

  renderContent() {
    if (this.state.searchTerms) {
      return (
        <React.Fragment>
          <h3 className={cardTitle}>Search Terms</h3>
          {this.renderList()}
          <MoreLink
            site={this.props.site}
            list={this.state.searchTerms}
            endpoint="referrers/Google"
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
        {this.state.loading && (
          <div className={clsx('mx-auto mt-44', styles.loading)}>
            <div></div>
          </div>
        )}
        <FadeIn show={!this.state.loading} className="flex-grow">
          {this.renderContent()}
        </FadeIn>
      </div>
    );
  }
}
