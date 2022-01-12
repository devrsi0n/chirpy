// @ts-nocheck
import React from 'react';

import { Link } from '$/components/Link';
import { ANALYTICS_DOMAIN } from '$/lib/constants';

import * as api from '../../analytics-api';
import numberFormatter, { durationFormatter } from '../../number-formatter';
import { parseQuery, Query } from '../../query';
import { Site } from '../../type';
import { Page } from '../pages/entry-pages';
import Modal from './modal';

interface EntryPagesModalProps {
  site: Site;
}

interface EntryPagesModalState {
  loading: boolean;
  query: Query;
  pages: Page[];
  page: number;
  moreResultsAvailable: boolean;
}

class EntryPagesModal extends React.Component<EntryPagesModalProps, EntryPagesModalState> {
  state: EntryPagesModalState = {
    loading: true,
    query: parseQuery(this.props.location.search, this.props.site),
    pages: [],
    page: 1,
    moreResultsAvailable: false,
  };

  componentDidMount() {
    this.loadPages();
  }

  loadPages() {
    const { query, page } = this.state;

    api
      .getStats(
        `/api/stats/${ANALYTICS_DOMAIN}/entry-pages`,
        this.props.site,
        query,
        {
          limit: 100,
          page,
        },
      )
      .then((res) =>
        this.setState((state) => ({
          loading: false,
          pages: [...state.pages, ...res],
          moreResultsAvailable: res.length === 100,
        })),
      );
  }

  loadMore() {
    const { page } = this.state;
    this.setState({ loading: true, page: page + 1 }, this.loadPages.bind(this));
  }

  formatBounceRate(page: Page) {
    if (typeof page.bounce_rate === 'number') {
      return `${page.bounce_rate}%`;
    }
    return '-';
  }

  showConversionRate() {
    return !!this.state.query.filters.goal;
  }

  showExtra() {
    return this.state.query.period !== 'realtime' && !this.showConversionRate();
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

  renderPage(page: Page) {
    const query = new URLSearchParams(window.location.search);
    query.set('entry_page', page.name);

    return (
      <tr className="text-sm dark:text-gray-200" key={page.name}>
        <td className="p-2">
          <Link
            href={`/${encodeURIComponent(this.props.site.domain)}?${query.toString()}`}
            className="hover:underline"
            disabled
          >
            {page.name}
          </Link>
        </td>
        {this.showConversionRate() && (
          <td className="p-2 w-32 font-medium" align="right">
            {numberFormatter(page.total_visitors)}
          </td>
        )}
        <td className="p-2 w-32 font-medium" align="right">
          {numberFormatter(page.unique_entrances)}
        </td>
        {this.showExtra() && (
          <td className="p-2 w-32 font-medium" align="right">
            {numberFormatter(page.total_entrances)}
          </td>
        )}
        {this.showExtra() && (
          <td className="p-2 w-32 font-medium" align="right">
            {durationFormatter(page.visit_duration)}
          </td>
        )}
        {this.showConversionRate() && (
          <td className="p-2 w-32 font-medium" align="right">
            {numberFormatter(page.conversion_rate)}%
          </td>
        )}
      </tr>
    );
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <div className="loading my-16 mx-auto">
          <div></div>
        </div>
      );
    } else if (this.state.moreResultsAvailable) {
      return (
        <div className="w-full text-center my-4">
          <button onClick={this.loadMore.bind(this)} type="button" className="button">
            Load more
          </button>
        </div>
      );
    }
  }

  renderBody() {
    if (this.state.pages) {
      return (
        <>
          <h1 className="text-xl font-bold dark:text-gray-100">Entry Pages</h1>

          <div className="my-4 border-b border-gray-300"></div>
          <main className="modal__content">
            <table className="w-max overflow-x-auto md:w-full table-striped table-fixed">
              <thead>
                <tr>
                  <th
                    className="p-2 w-48 md:w-56 lg:w-1/3 text-xs tracking-wide font-bold text-gray-500 dark:text-gray-400"
                    align="left"
                  >
                    Page url
                  </th>
                  {this.showConversionRate() && (
                    <th
                      className="p-2 w-32 text-xs tracking-wide font-bold text-gray-500 dark:text-gray-400"
                      align="right"
                    >
                      Total Visitors{' '}
                    </th>
                  )}
                  <th
                    className="p-2 w-32 text-xs tracking-wide font-bold text-gray-500 dark:text-gray-400"
                    align="right"
                  >
                    {this.label()}{' '}
                  </th>
                  {this.showExtra() && (
                    <th
                      className="p-2 w-32 text-xs tracking-wide font-bold text-gray-500 dark:text-gray-400"
                      align="right"
                    >
                      Total Entrances{' '}
                    </th>
                  )}
                  {this.showExtra() && (
                    <th
                      className="p-2 w-32 text-xs tracking-wide font-bold text-gray-500 dark:text-gray-400"
                      align="right"
                    >
                      Visit Duration{' '}
                    </th>
                  )}
                  {this.showConversionRate() && (
                    <th
                      className="p-2 w-32 text-xs tracking-wide font-bold text-gray-500 dark:text-gray-400"
                      align="right"
                    >
                      CR{' '}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>{this.state.pages.map(this.renderPage.bind(this))}</tbody>
            </table>
          </main>
        </>
      );
    }
  }

  render() {
    return (
      <Modal site={this.props.site}>
        {this.renderBody()}
        {this.renderLoading()}
      </Modal>
    );
  }
}

export default EntryPagesModal;
