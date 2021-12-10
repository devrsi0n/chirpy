import React from 'react';
import FlipMove from 'react-flip-move';
import 'twin.macro';

import { Link } from '$/components/Link';

import * as api from '../../api';
import FadeIn from '../../fade-in';
import LazyLoader from '../../lazy-loader';
import numberFormatter from '../../number-formatter';
import * as storage from '../../storage';
import { cardTitle, labelContainer } from '../../styles';
import { Timer } from '../../timer';
import { Props } from '../../type';
import * as url from '../../url';
import Bar from '../bar';
import { EmptyState } from '../empty-state';
import { ViewNumber } from '../fine-components';
import MoreLink from '../more-link';
import { Referrer } from './referrer-list';

interface AllSourcesProps extends Props {
  timer: Timer;
  renderTabs: () => JSX.Element;
}

interface AllSourcesState {
  loading: boolean;
  referrers: Referrer[] | null;
}

class AllSources extends React.Component<AllSourcesProps> {
  state: AllSourcesState = { loading: true, referrers: null };

  onVisible = () => {
    this.fetchReferrers();
    this.props.timer?.onTick(this.fetchReferrers);
  };

  componentDidUpdate(prevProps: AllSourcesProps) {
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

  fetchReferrers = () => {
    api
      .get(
        `/api/stats/${encodeURIComponent(this.props.site.domain)}/sources`,
        this.props.site,
        this.props.query,
        {
          show_noref: this.showNoRef(),
        },
      )
      .then((res) => this.setState({ loading: false, referrers: res }));
  };

  renderReferrer(referrer: Referrer) {
    const maxWidthDeduction = this.showConversionRate() ? '10rem' : '5rem';

    return (
      <div className="flex items-center justify-between my-1 text-sm" key={referrer.name}>
        <Bar
          count={referrer.visitors}
          all={this.state.referrers!}
          color="blue"
          maxWidthDeduction={maxWidthDeduction}
        >
          <span className="flex px-2 py-1.5 dark:text-gray-300 relative z-9 break-all">
            <Link
              disabled
              className="md:truncate block hover:underline"
              href={url.setQuery('source', referrer.name)}
            >
              <img
                src={`${
                  process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN
                }/favicon/sources/${encodeURIComponent(referrer.name)}`}
                className="inline w-4 h-4 mr-2 -mt-px align-middle"
                alt={`Favorite icon for ${referrer.name}`}
              />
              {referrer.name}
            </Link>
          </span>
        </Bar>
        <ViewNumber>{numberFormatter(referrer.visitors)}</ViewNumber>
        {this.showConversionRate() && <ViewNumber>{referrer.conversion_rate}%</ViewNumber>}
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
    return this.state.referrers && this.state.referrers.length > 0 ? (
      <React.Fragment>
        <div css={labelContainer}>
          <span>Source</span>
          <div className="text-right">
            <span className="inline-block w-20">{this.label()}</span>
            {this.showConversionRate() && <span className="inline-block w-20">CR</span>}
          </div>
        </div>

        <FlipMove className="flex-grow">
          {this.state.referrers.map((element) => this.renderReferrer(element))}
        </FlipMove>
        <MoreLink site={this.props.site} list={this.state.referrers} endpoint="sources" />
      </React.Fragment>
    ) : (
      <EmptyState />
    );
  }

  renderContent() {
    return (
      <LazyLoader className="flex flex-col flex-grow" onVisible={this.onVisible}>
        <div id="sources" className="flex justify-between w-full">
          <h3 className="font-bold text-gray-1100">Top Sources</h3>
          {this.props.renderTabs()}
        </div>
        {this.state.loading && (
          <div className="mx-auto loading mt-44">
            <div></div>
          </div>
        )}
        <FadeIn show={!this.state.loading} className="flex flex-col flex-grow">
          {this.renderList()}
        </FadeIn>
      </LazyLoader>
    );
  }

  render() {
    return (
      <div className="relative p-4 bg-white rounded shadow-xl stats-item flex flex-col mt-6 w-full dark:bg-gray-825">
        {this.renderContent()}
      </div>
    );
  }
}

const UTM_TAGS = {
  utm_medium: { label: 'UTM Medium', endpoint: 'utm_mediums' },
  utm_source: { label: 'UTM Source', endpoint: 'utm_sources' },
  utm_campaign: { label: 'UTM Campaign', endpoint: 'utm_campaigns' },
} as const;

type UTMTagKey = keyof typeof UTM_TAGS;

interface UTMSourcesProps extends AllSourcesProps {
  tab: UTMTagKey;
}

interface UTMSourcesState extends AllSourcesState {}

class UTMSources extends React.Component<UTMSourcesProps> {
  state: UTMSourcesState = { loading: true, referrers: null };

  componentDidMount() {
    this.fetchReferrers();
    if (this.props.timer) this.props.timer.onTick(this.fetchReferrers);
  }

  componentDidUpdate(prevProps: UTMSourcesProps) {
    if (this.props.query !== prevProps.query || this.props.tab !== prevProps.tab) {
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

  fetchReferrers = () => {
    const endpoint = UTM_TAGS[this.props.tab].endpoint;
    api
      .get(
        `/api/stats/${encodeURIComponent(this.props.site.domain)}/${endpoint}`,
        this.props.site,
        this.props.query,
        { show_noref: this.showNoRef() },
      )
      .then((res) => this.setState({ loading: false, referrers: res }));
  };

  renderReferrer = (referrer: Referrer) => {
    const maxWidthDeduction = this.showConversionRate() ? '10rem' : '5rem';

    return (
      <div className="flex items-center justify-between my-1 text-sm" key={referrer.name}>
        <Bar
          count={referrer.visitors}
          all={this.state.referrers!}
          color="blue"
          maxWidthDeduction={maxWidthDeduction}
        >
          <span className="flex px-2 py-1.5 dark:text-gray-300 relative z-9 break-all">
            <Link
              disabled
              className="md:truncate block hover:underline"
              href={url.setQuery(this.props.tab, referrer.name)}
            >
              {referrer.name}
            </Link>
          </span>
        </Bar>
        <ViewNumber>{numberFormatter(referrer.visitors)}</ViewNumber>
        {this.showConversionRate() && <ViewNumber>{referrer.conversion_rate}%</ViewNumber>}
      </div>
    );
  };

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
    return this.state.referrers && this.state.referrers.length > 0 ? (
      <div className="flex flex-col flex-grow">
        <div css={labelContainer}>
          <span>{UTM_TAGS[this.props.tab].label}</span>
          <div className="text-right">
            <span className="inline-block w-20">{this.label()}</span>
            {this.showConversionRate() && <span className="inline-block w-20">CR</span>}
          </div>
        </div>

        <FlipMove className="flex-grow">
          {this.state.referrers.map((element) => this.renderReferrer(element))}
        </FlipMove>
        <MoreLink
          site={this.props.site}
          list={this.state.referrers}
          endpoint={UTM_TAGS[this.props.tab].endpoint}
        />
      </div>
    ) : (
      <EmptyState />
    );
  }

  renderContent() {
    return (
      <React.Fragment>
        <div className="flex justify-between w-full">
          <h3 css={cardTitle}>Top Sources</h3>
          {this.props.renderTabs()}
        </div>
        {this.state.loading && (
          <div className="mx-auto loading mt-44">
            <div></div>
          </div>
        )}
        <FadeIn show={!this.state.loading} className="flex flex-col flex-grow">
          {this.renderList()}
        </FadeIn>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="relative p-4 bg-white rounded shadow-xl stats-item flex flex-col dark:bg-gray-825 mt-6 w-full">
        {this.renderContent()}
      </div>
    );
  }
}

type Tab = 'utm_source' | 'utm_medium' | 'utm_campaign' | 'all';

interface SourceListProps extends Omit<AllSourcesProps, 'renderTabs'> {}
interface SourceListState {
  tab: Tab;
}

export default class SourceList extends React.Component<SourceListProps, SourceListState> {
  tabKey: string = 'sourceTab__' + this.props.site.domain;
  state: SourceListState = {
    tab: storage.getItem(this.tabKey) || 'all',
  };

  setTab = (tab: Tab) => {
    return () => {
      storage.setItem(this.tabKey, tab);
      this.setState({ tab });
    };
  };

  renderTabs = () => {
    const activeClass = 'inline-block h-5 text-indigo-900 font-bold active-prop-heading';
    const defaultClass = 'hover:text-indigo-1100 cursor-pointer';
    return (
      <ul className="flex text-xs font-medium text-gray-1100 space-x-2">
        <li
          className={this.state.tab === 'all' ? activeClass : defaultClass}
          onClick={this.setTab('all')}
        >
          All
        </li>
        <li
          className={this.state.tab === 'utm_medium' ? activeClass : defaultClass}
          onClick={this.setTab('utm_medium')}
        >
          Medium
        </li>
        <li
          className={this.state.tab === 'utm_source' ? activeClass : defaultClass}
          onClick={this.setTab('utm_source')}
        >
          Source
        </li>
        <li
          className={this.state.tab === 'utm_campaign' ? activeClass : defaultClass}
          onClick={this.setTab('utm_campaign')}
        >
          Campaign
        </li>
      </ul>
    );
  };

  render() {
    switch (this.state.tab) {
      case 'all': {
        return <AllSources {...this.props} renderTabs={this.renderTabs} />;
      }
      case 'utm_medium': {
        return <UTMSources tab={this.state.tab} renderTabs={this.renderTabs} {...this.props} />;
      }
      case 'utm_source': {
        return <UTMSources tab={this.state.tab} renderTabs={this.renderTabs} {...this.props} />;
      }
      case 'utm_campaign': {
        return <UTMSources tab={this.state.tab} renderTabs={this.renderTabs} {...this.props} />;
      }
      // No default
    }
  }
}
