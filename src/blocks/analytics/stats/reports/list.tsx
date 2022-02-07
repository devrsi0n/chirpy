import React from 'react';
import 'twin.macro';

import { Link } from '$/components/link';

import FadeIn from '../../fade-in';
import LazyLoader from '../../lazy-loader';
import numberFormatter from '../../number-formatter';
import { Query } from '../../query';
import { labelContainer } from '../../styles';
import { Timer } from '../../timer';
import Bar, { BarProps } from '../bar';
import { EmptyState } from '../empty-state';
import { ViewNumber } from '../fine-components';
import MoreLink from '../more-link';

export interface ListReportProps extends Partial<Pick<BarProps, 'color'>> {
  query: Query;
  timer?: Timer;
  fetchData: () => Promise<any>;
  tooltipText?: (listItem: any) => string;
  renderIcon?: (listItem: any) => React.ReactNode;
  detailsLink?: string;
  keyLabel: string;
  filter: { [key: string]: string };
}

type ListReportItem = { count: number; name: string; percentage: number | undefined };

interface ListReportState {
  loading: boolean;
  list: ListReportItem[] | null;
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

  renderListItem(listItem: ListReportItem) {
    const query = new URLSearchParams(window.location.search);

    Object.entries(this.props.filter).forEach(([key, valueKey]) => {
      // @ts-ignore
      query.set(key, listItem[valueKey]);
    });

    const maxWidthDeduction = this.showConversionRate() ? '10rem' : '5rem';

    return (
      <div className="flex items-center justify-between my-1 text-sm" key={listItem.name}>
        <Bar
          count={listItem.count}
          all={this.state.list!}
          color={this.props.color || 'green'}
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
          {numberFormatter(listItem.count)}
          {(listItem.percentage || 0) >= 0 && (
            <span className="inline-block w-8 text-xs text-right">({listItem.percentage}%)</span>
          )}
        </ViewNumber>
        {/* @ts-ignore */}
        {this.showConversionRate() && <ViewNumber>{listItem.conversion_rate}%</ViewNumber>}
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
          {this.state.list.map((item: any) => this.renderListItem(item))}
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
          <MoreLink url={this.props.detailsLink} list={this.state.list!} />
        )}
      </LazyLoader>
    );
  }
}
