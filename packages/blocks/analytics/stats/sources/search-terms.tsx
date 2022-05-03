import clsx from 'clsx';
import React from 'react';

import { ANALYTICS_DOMAIN } from '@chirpy/utilities';

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

export default class SearchTerms extends React.Component<SearchTermsProps, SearchTermsState> {
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
      <div className="flex items-center justify-between my-1 text-sm" key={term.name}>
        <Bar
          count={term.visitors}
          all={this.state.searchTerms!}
          color="blue"
          maxWidthDeduction="4rem"
        >
          <span className="flex px-2 py-1.5 dark:text-gray-300 z-9 relative break-all">
            <span className="md:truncate block">{term.name}</span>
          </span>
        </Bar>
        <span className="font-medium dark:text-gray-200">{numberFormatter(term.visitors)}</span>
      </div>
    );
  }

  renderList() {
    if (this.props.query.filters.goal) {
      return (
        <div className="text-center text-gray-700 dark:text-gray-300 text-sm mt-20">
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
        <div className="text-center text-gray-700 dark:text-gray-300 text-sm mt-20">
          <RocketIcon />
          <div>The site is not connected to Google Search Keywords</div>
          <div>Cannot show search terms</div>
          {this.state.isAdmin && (
            <a
              href={`/${encodeURIComponent(this.props.site.domain)}/settings/search-console`}
              className="button mt-4"
            >
              Connect with Google
            </a>
          )}
        </div>
      );
    } else if (this.state.searchTerms!.length > 0) {
      const valLabel = this.props.query.period === 'realtime' ? 'Current visitors' : 'Visitors';

      return (
        <React.Fragment>
          <div className="flex items-center mt-3 mb-2 justify-between text-gray-500 dark:text-gray-400 text-xs font-bold tracking-wide">
            <span>Search term</span>
            <span>{valLabel}</span>
          </div>

          {this.state.searchTerms!.map((element) => this.renderSearchTerm(element))}
        </React.Fragment>
      );
    } else {
      return (
        <div className="text-center text-gray-700 dark:text-gray-300 text-sm mt-20">
          <RocketIcon />
          <div>Could not find any search terms for this period</div>
          <div>Google Search Console data is sampled and delayed by 24-36h</div>
          <div>
            Read more on{' '}
            <a
              href="https://docs.plausible.io/google-search-console-integration/#i-dont-see-google-search-query-data-in-my-dashboard"
              target="_blank"
              rel="noreferrer"
              className="hover:underline text-indigo-700 dark:text-indigo-500"
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
          'flex flex-col relative bg-white dark:bg-gray-825 shadow-xl rounded p-4 mt-6 w-full',
          styles['stats-item'],
        )}
      >
        {this.state.loading && (
          <div className={clsx('mt-44 mx-auto', styles.loading)}>
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
