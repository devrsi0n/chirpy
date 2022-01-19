import React from 'react';
import FlipMove from 'react-flip-move';
import 'twin.macro';

import { Link } from '$/components/Link';
import { Tabs } from '$/components/Tabs';
import { ANALYTICS_DOMAIN } from '$/lib/constants';

import * as api from '../../analytics-api';
import FadeIn from '../../fade-in';
import LazyLoader from '../../lazy-loader';
import numberFormatter from '../../number-formatter';
import { labelContainer } from '../../styles';
import { Timer } from '../../timer';
import { Props } from '../../type';
import * as url from '../../url';
import Bar from '../bar';
import { EmptyState } from '../empty-state';
import { AnalyticsCard, ViewNumber } from '../fine-components';
import MoreLink from '../more-link';
import { Referrer } from './referrer-list';

interface SourceListProps extends AllSourcesProps {}

export default function SourceList(props: SourceListProps): JSX.Element {
  return (
    <AnalyticsCard>
      <Tabs
        cacheKey="analytics.source-list"
        initialValue="all"
        leftItem={<h3 tw="font-bold text-gray-1100">Top Sources</h3>}
      >
        <Tabs.Item label="All" value="all">
          <AllSources {...props} />
        </Tabs.Item>
        <Tabs.Item label="Medium" value="utm_medium">
          <UTMSources {...props} tab="utm_medium" />
        </Tabs.Item>
        <Tabs.Item label="Source" value="utm_source">
          <UTMSources {...props} tab="utm_source" />
        </Tabs.Item>
        <Tabs.Item label="Campaign" value="utm_campaign">
          <UTMSources {...props} tab="utm_campaign" />
        </Tabs.Item>
      </Tabs>
    </AnalyticsCard>
  );
}

interface AllSourcesProps extends Props {
  timer: Timer;
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
      .getStats(`/api/stats/${ANALYTICS_DOMAIN}/sources`, this.props.site, this.props.query, {
        show_noref: this.showNoRef(),
      })
      .then((res) => this.setState({ loading: false, referrers: res }));
  };

  renderReferrer(referrer: Referrer) {
    const maxWidthDeduction = this.showConversionRate() ? '10rem' : '5rem';

    return (
      <div className="flex items-center justify-between my-1 text-sm" key={referrer.name}>
        <Bar
          count={referrer.count}
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
        <ViewNumber>{numberFormatter(referrer.count)}</ViewNumber>
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
    return (
      <>
        {this.state.referrers && this.state.referrers.length > 0 ? (
          <>
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
          </>
        ) : (
          <EmptyState />
        )}
      </>
    );
  }

  render() {
    return (
      <LazyLoader className="flex flex-col flex-grow" onVisible={this.onVisible}>
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
      .getStats(`/api/stats/${ANALYTICS_DOMAIN}/${endpoint}`, this.props.site, this.props.query, {
        show_noref: this.showNoRef(),
      })
      .then((res) => this.setState({ loading: false, referrers: res }));
  };

  renderReferrer = (referrer: Referrer) => {
    const maxWidthDeduction = this.showConversionRate() ? '10rem' : '5rem';

    return (
      <div className="flex items-center justify-between my-1 text-sm" key={referrer.name}>
        <Bar
          count={referrer.count}
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
        <ViewNumber>{numberFormatter(referrer.count)}</ViewNumber>
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

  render() {
    return (
      <>
        {this.state.loading && (
          <div className="mx-auto loading mt-44">
            <div></div>
          </div>
        )}
        <FadeIn show={!this.state.loading} className="flex flex-col flex-grow">
          {this.renderList()}
        </FadeIn>
      </>
    );
  }
}
