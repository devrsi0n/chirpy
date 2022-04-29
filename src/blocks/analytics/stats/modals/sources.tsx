// @ts-nocheck
import clsx from 'clsx';
import React from 'react';

import { Link } from '$/components/link';
import { ANALYTICS_DOMAIN } from '$/lib/constants';

import * as api from '../../analytics-api';
import styles from '../../analytics.module.scss';
import numberFormatter, { durationFormatter } from '../../number-formatter';
import { parseQuery } from '../../query';
import Modal from './modal';

const TITLES = {
  sources: 'Top Sources',
  utm_mediums: 'Top UTM mediums',
  utm_sources: 'Top UTM sources',
  utm_campaigns: 'Top UTM campaigns',
};

class SourcesModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      sources: [],
      query: parseQuery(props.location.search, props.site),
      page: 1,
      moreResultsAvailable: false,
    };
  }

  loadSources() {
    const { site } = this.props;
    const { query, page, sources } = this.state;

    const detailed = this.showExtra();
    api
      .getStats(`/api/stats/${ANALYTICS_DOMAIN}/${this.currentFilter()}`, this.props.site, query, {
        limit: 100,
        page,
        detailed,
        show_noref: true,
      })
      .then((res) =>
        this.setState({
          loading: false,
          sources: [...sources, ...res],
          moreResultsAvailable: res.length === 100,
        }),
      );
  }

  componentDidMount() {
    this.loadSources();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ sources: [], loading: true }, this.loadSources.bind(this));
    }
  }

  currentFilter() {
    const urlparts = this.props.location.pathname.split('/');
    return urlparts[urlparts.length - 1];
  }

  showExtra() {
    return this.state.query.period !== 'realtime' && !this.state.query.filters.goal;
  }

  showConversionRate() {
    return !!this.state.query.filters.goal;
  }

  loadMore() {
    this.setState({ loading: true, page: this.state.page + 1 }, this.loadSources.bind(this));
  }

  formatBounceRate(page) {
    return typeof page.bounce_rate === 'number' ? page.bounce_rate + '%' : '-';
  }

  formatDuration(source) {
    return typeof source.visit_duration === 'number'
      ? durationFormatter(source.visit_duration)
      : '-';
  }

  renderSource(source) {
    const query = new URLSearchParams(window.location.search);
    const filter = this.currentFilter();
    if (filter === 'sources') query.set('source', source.name);
    if (filter === 'utm_mediums') query.set('utm_medium', source.name);
    if (filter === 'utm_sources') query.set('utm_source', source.name);
    if (filter === 'utm_campaigns') query.set('utm_campaign', source.name);

    console.log(source);

    return (
      <tr className="text-sm dark:text-gray-200" key={source.name}>
        <td className="p-2">
          <img
            src={`${process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN}/favicon/sources/${encodeURIComponent(
              source.name,
            )}`}
            className="h-4 w-4 mr-2 align-middle inline"
            alt={`Favorite icon for ${source.name}`}
          />
          <Link
            disabled
            className="hover:underline"
            href={'/' + encodeURIComponent(this.props.site.domain) + '?' + query.toString()}
          >
            {source.name}
          </Link>
        </td>
        {this.showConversionRate() && (
          <td className="p-2 w-32 font-medium" align="right">
            {numberFormatter(source.total_visitors)}
          </td>
        )}
        <td className="p-2 w-32 font-medium" align="right">
          {numberFormatter(source.visitors)}
        </td>
        {this.showExtra() && (
          <td className="p-2 w-32 font-medium" align="right">
            {this.formatBounceRate(source)}
          </td>
        )}
        {this.showExtra() && (
          <td className="p-2 w-32 font-medium" align="right">
            {this.formatDuration(source)}
          </td>
        )}
        {this.showConversionRate() && (
          <td className="p-2 w-32 font-medium" align="right">
            {source.conversion_rate}%
          </td>
        )}
      </tr>
    );
  }

  label() {
    if (this.state.query.period === 'realtime') {
      return 'Current visitors';
    }

    if (this.showConversionRate()) {
      return 'Conversions';
    }

    return 'Visitors';
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <div className={clsx('my-16 mx-auto', styles.loading)}>
          <div></div>
        </div>
      );
    } else if (this.state.moreResultsAvailable) {
      return (
        <div className="w-full text-center my-4">
          <button
            onClick={this.loadMore.bind(this)}
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring active:bg-indigo-700 transition ease-in-out duration-150"
          >
            Load more
          </button>
        </div>
      );
    }
  }

  title() {
    return TITLES[this.currentFilter()];
  }

  render() {
    return (
      <Modal site={this.props.site}>
        <h1 className="text-xl font-bold dark:text-gray-100">{this.title()}</h1>

        <div className="my-4 border-b border-gray-300 dark:border-gray-500"></div>

        <main className="modal__content">
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
                  className="p-2 w-48 md:w-56 lg:w-1/3 text-xs tracking-wide font-bold text-gray-500 dark:text-gray-400"
                  align="left"
                >
                  Source
                </th>
                {this.showConversionRate() && (
                  <th
                    className="p-2 w-32 text-xs tracking-wide font-bold text-gray-500 dark:text-gray-400"
                    align="right"
                  >
                    Total visitors
                  </th>
                )}
                <th
                  className="p-2 w-32 text-xs tracking-wide font-bold text-gray-500 dark:text-gray-400"
                  align="right"
                >
                  {this.label()}
                </th>
                {this.showExtra() && (
                  <th
                    className="p-2 w-32 text-xs tracking-wide font-bold text-gray-500 dark:text-gray-400"
                    align="right"
                  >
                    Bounce rate
                  </th>
                )}
                {this.showExtra() && (
                  <th
                    className="p-2 w-32 text-xs tracking-wide font-bold text-gray-500 dark:text-gray-400"
                    align="right"
                  >
                    Visit duration
                  </th>
                )}
                {this.showConversionRate() && (
                  <th
                    className="p-2 w-32 text-xs tracking-wide font-bold text-gray-500 dark:text-gray-400"
                    align="right"
                  >
                    CR
                  </th>
                )}
              </tr>
            </thead>
            <tbody>{this.state.sources.map(this.renderSource.bind(this))}</tbody>
          </table>
        </main>

        {this.renderLoading()}
      </Modal>
    );
  }
}

export default SourcesModal;
