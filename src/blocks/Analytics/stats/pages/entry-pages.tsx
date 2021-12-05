import React from 'react';
import FlipMove from 'react-flip-move';

import { Link } from '$/components/Link';

import * as api from '../../api';
import { EmptyState } from '../../components/EmptyState';
import FadeIn from '../../fade-in';
import LazyLoader from '../../lazy-loader';
import numberFormatter from '../../number-formatter';
import * as url from '../../url';
import Bar from '../bar';
import MoreLink from '../more-link';

export default class EntryPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.onVisible = this.onVisible.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.setState({ loading: true, pages: null });
      this.fetchPages();
    }
  }

  onVisible() {
    this.fetchPages();
    if (this.props.timer) this.props.timer.onTick(this.fetchPages.bind(this));
  }

  showConversionRate() {
    return !!this.props.query.filters.goal;
  }

  fetchPages() {
    api
      .get(`/api/stats/${encodeURIComponent(this.props.site.domain)}/entry-pages`, this.props.query)
      .then((res) => this.setState({ loading: false, pages: res }));
  }

  label() {
    if (this.props.query.period === 'realtime') {
      return 'Current visitors';
    }

    if (this.showConversionRate()) {
      return 'Conversions';
    }

    return 'Unique Entrances';
  }

  renderPage(page) {
    const externalLink = url.externalLinkForPage(this.props.site.domain, page.name);
    const maxWidthDeduction = this.showConversionRate() ? '10rem' : '5rem';

    return (
      <div className="flex items-center justify-between my-1 text-sm" key={page.name}>
        <Bar
          count={page.unique_entrances}
          all={this.state.pages}
          plot="unique_entrances"
          className="bg-orange-50 dark:bg-gray-500 dark:bg-opacity-15"
          maxWidthDeduction={maxWidthDeduction}
        >
          <span className="flex px-2 py-1.5 group dark:text-gray-300 relative break-all z-9">
            <Link
              href={url.setQuery('entry_page', page.name)}
              className="md:truncate block hover:underline"
              disabled
            >
              {page.name}
            </Link>
            <a
              target="_blank"
              rel="noreferrer"
              href={externalLink}
              className="hidden group-hover:block"
            >
              <svg
                className="inline w-4 h-4 ml-1 -mt-1 text-gray-600 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
              </svg>
            </a>
          </span>
        </Bar>
        <span className="font-medium dark:text-gray-200 w-20 text-right">
          {numberFormatter(page.unique_entrances)}
        </span>
        {this.showConversionRate() && (
          <span className="font-medium dark:text-gray-200 w-20 text-right">
            {numberFormatter(page.conversion_rate)}%
          </span>
        )}
      </div>
    );
  }

  renderList() {
    if (this.state.pages && this.state.pages.length > 0) {
      return (
        <>
          <div className="flex items-center justify-between mt-3 mb-2 text-xs font-bold tracking-wide text-gray-1100">
            <span>Page url</span>
            <div className="text-right">
              <span className="inline-block w-30">{this.label()}</span>
              {this.showConversionRate() && <span className="inline-block w-20">CR</span>}
            </div>
          </div>

          <FlipMove>{this.state.pages.map(this.renderPage.bind(this))}</FlipMove>
        </>
      );
    }
    return <EmptyState />;
  }

  render() {
    const { loading } = this.state;
    return (
      <LazyLoader onVisible={this.onVisible} className="flex flex-col flex-grow">
        {loading && (
          <div className="mx-auto loading mt-44">
            <div></div>
          </div>
        )}
        <FadeIn show={!loading} className="flex-grow">
          {this.renderList()}
        </FadeIn>
        {!loading && (
          <MoreLink site={this.props.site} list={this.state.pages} endpoint="entry-pages" />
        )}
      </LazyLoader>
    );
  }
}
