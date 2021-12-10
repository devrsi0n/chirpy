import React from 'react';
import 'twin.macro';

import { Link } from '$/components/Link';

import FadeIn from '../../fade-in';
import LazyLoader from '../../lazy-loader';
import numberFormatter from '../../number-formatter';
import { Query } from '../../query';
import { labelContainer } from '../../styles';
import { Timer } from '../../timer';
import Bar from '../bar';
import { EmptyState } from '../empty-state';
import MoreLink from '../more-link';
import { ViewNumber } from '../fine-components';

interface ListReportProps {
  query: Query;
  timer?: Timer;
  fetchData: () => Promise<any>;
  color?: string;
  tooltipText?: (listItem: any) => string;
  renderIcon?: (listItem: any) => React.ReactNode;
  detailsLink?: string;
  keyLabel: string;
  filter: { [key: string]: string };
}

interface ListReportState {
  loading: boolean;
  list: any;
}

export default class ListReport extends React.Component<ListReportProps, ListReportState> {
  state: ListReportState = { loading: true, list: null };

  componentDidUpdate(prevProps: ListReportProps) {
    if (this.props.query !== prevProps.query) {
      this.fetchData();
    }
  }

  onVisible = () => {
    this.fetchData();
    if (this.props.timer) this.props.timer.onTick(this.fetchData.bind(this));
  };

  fetchData() {
    this.setState({ loading: true, list: null });
    this.props.fetchData().then((res) => this.setState({ loading: false, list: res }));
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

  showConversionRate() {
    return !!this.props.query.filters.goal;
  }

  renderListItem(listItem: any) {
    const query = new URLSearchParams(window.location.search);

    Object.entries(this.props.filter).forEach(([key, valueKey]) => {
      query.set(key, listItem[valueKey]);
    });

    const maxWidthDeduction = this.showConversionRate() ? '10rem' : '5rem';
    const lightBackground = this.props.color || '';

    return (
      <div className="flex items-center justify-between my-1 text-sm" key={listItem.name}>
        <Bar
          count={listItem.visitors}
          all={this.state.list}
          className={`${lightBackground} bg-green-200`}
          maxWidthDeduction={maxWidthDeduction}
        >
          <span
            className="flex px-2 py-1.5 dark:text-gray-300 relative z-9 break-all"
            tooltip={this.props.tooltipText?.(listItem)}
          >
            <Link
              disabled
              className="md:truncate block hover:underline"
              href={`${location.href}?${query.toString()}`}
            >
              {this.props.renderIcon?.(listItem)}
              {this.props.renderIcon && ' '}
              {listItem.name}
            </Link>
          </span>
        </Bar>
        <ViewNumber>
          {numberFormatter(listItem.visitors)}
          {listItem.percentage >= 0 ? (
            <span className="inline-block w-8 text-xs text-right">({listItem.percentage}%)</span>
          ) : null}
        </ViewNumber>
        {this.showConversionRate() && (
          <ViewNumber>
            {listItem.conversion_rate}%
          </ViewNumber>
        )}
      </div>
    );
  }

  renderList() {
    if (this.state.list && this.state.list.length > 0) {
      return (
        <>
          <div css={labelContainer}>
            <span>{this.props.keyLabel}</span>
            <span className="text-right">
              <span className="inline-block w-20">{this.label()}</span>
              {this.showConversionRate() && <span className="inline-block w-20">CR</span>}
            </span>
          </div>
          {this.state.list.map((element: any) => this.renderListItem(element))}
        </>
      );
    }

    return <EmptyState />;
  }

  render() {
    return (
      <LazyLoader onVisible={this.onVisible} className="flex flex-col flex-grow">
        {this.state.loading && (
          <div className="mx-auto loading mt-44">
            <div></div>
          </div>
        )}
        <FadeIn show={!this.state.loading} className="flex-grow">
          {this.renderList()}
        </FadeIn>
        {this.props.detailsLink && !this.state.loading && (
          <MoreLink url={this.props.detailsLink} list={this.state.list} />
        )}
      </LazyLoader>
    );
  }
}
