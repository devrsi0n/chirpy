// @ts-nocheck
import clsx from 'clsx';
import React from 'react';

import { Link } from '$/components/link';
import { ANALYTICS_DOMAIN } from '$/lib/constants';

import * as api from '../../analytics-api';
import styles from '../../analytics.module.scss';
import numberFormatter from '../../number-formatter';
import { parseQuery, toHuman } from '../../query';
import Modal from './modal';
import RocketIcon from './rocket-icon';

class GoogleKeywordsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      query: parseQuery(props.location.search, props.site),
    };
  }

  componentDidMount() {
    if (this.state.query.filters.goal) {
      api
        .getStats(
          `/api/stats/${ANALYTICS_DOMAIN}/goal/referrers/Google`,
          this.props.site,
          this.state.query,
          { limit: 100 },
        )
        .then((res) =>
          this.setState({
            loading: false,
            searchTerms: res.search_terms,
            totalVisitors: res.total_visitors,
            notConfigured: res.not_configured,
            isOwner: res.is_owner,
          }),
        );
    } else {
      api
        .getStats(
          `/api/stats/${ANALYTICS_DOMAIN}/referrers/Google`,
          this.props.site,
          this.state.query,
          { limit: 100 },
        )
        .then((res) =>
          this.setState({
            loading: false,
            searchTerms: res.search_terms,
            totalVisitors: res.total_visitors,
            notConfigured: res.not_configured,
            isOwner: res.is_owner,
          }),
        );
    }
  }

  renderTerm(term) {
    return (
      <React.Fragment key={term.name}>
        <tr className="text-sm dark:text-gray-200" key={term.name}>
          <td className="truncate p-2">{term.name}</td>
          <td className="w-32 p-2 font-medium" align="right">
            {numberFormatter(term.visitors)}
          </td>
        </tr>
      </React.Fragment>
    );
  }

  renderKeywords() {
    if (this.state.query.filters.goal) {
      return (
        <div className="mt-6 text-center text-gray-700 dark:text-gray-300">
          <RocketIcon />
          <div className="text-lg">
            Sorry, we cannot show which keywords converted best for goal{' '}
            <b>{this.state.query.filters.goal}</b>
          </div>
          <div className="text-lg">Google does not share this information</div>
        </div>
      );
    } else if (this.state.notConfigured) {
      return this.state.isOwner ? (
        <div className="mt-6 text-center text-gray-700 dark:text-gray-300">
          <RocketIcon />
          <div className="text-lg">The site is not connected to Google Search Keywords</div>
          <div className="text-lg">Configure the integration to view search terms</div>
          <a
            href={`/${encodeURIComponent(this.props.site.domain)}/settings/search-console`}
            className="button mt-4"
          >
            Connect with Google
          </a>
        </div>
      ) : (
        <div className="mt-6 text-center text-gray-700 dark:text-gray-300">
          <RocketIcon />
          <div className="text-lg">The site is not connected to Google Search Kewyords</div>
          <div className="text-lg">Cannot show search terms</div>
        </div>
      );
    } else if (this.state.searchTerms.length > 0) {
      return (
        <table
          className={clsx(
            'w-max overflow-x-auto md:w-full',
            styles['table-striped'],
            styles['table-fixed'],
          )}
        >
          <thead>
            <tr>
              <th
                className="w-48 p-2 text-xs font-bold tracking-wide text-gray-500 dark:text-gray-400 md:w-56 lg:w-1/3"
                align="left"
              >
                Search Term
              </th>
              <th
                className="w-32 p-2 text-xs font-bold tracking-wide text-gray-500 dark:text-gray-400 lg:w-1/2"
                align="right"
              >
                Visitors
              </th>
            </tr>
          </thead>
          <tbody>{this.state.searchTerms.map(this.renderTerm.bind(this))}</tbody>
        </table>
      );
    } else {
      return (
        <div className="mt-6 text-center text-gray-700 dark:text-gray-300">
          <RocketIcon />
          <div className="text-lg">Could not find any search terms for this period</div>
        </div>
      );
    }
  }

  renderGoalText() {
    if (this.state.query.filters.goal) {
      return (
        <h1 className="text-xl font-semibold leading-none text-gray-500 dark:text-gray-200">
          completed {this.state.query.filters.goal}
        </h1>
      );
    }
  }

  renderBody() {
    return this.state.loading ? (
      <div className={clsx('mx-auto mt-32', styles.loading)}>
        <div></div>
      </div>
    ) : (
      <React.Fragment>
        <Link
          disabled
          href={`/${encodeURIComponent(this.props.site.domain)}/referrers${window.location.search}`}
          className="font-bold text-gray-700 hover:underline dark:text-gray-200"
        >
          ← All referrers
        </Link>

        <div className="my-4 border-b border-gray-300 dark:border-gray-500"></div>
        <main className="modal__content">
          <h1 className="mb-0 text-xl font-semibold leading-none dark:text-gray-200">
            {this.state.totalVisitors} visitors from Google
            <br />
            {toHuman(this.state.query)}
          </h1>
          {this.renderGoalText()}
          {this.renderKeywords()}
        </main>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Modal site={this.props.site} show={!this.state.loading}>
        {this.renderBody()}
      </Modal>
    );
  }
}

export default GoogleKeywordsModal;
