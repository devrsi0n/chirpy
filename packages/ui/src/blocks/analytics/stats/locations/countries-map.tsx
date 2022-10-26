import clsx from 'clsx';
import * as d3 from 'd3';
// @ts-ignore
import Datamap from 'datamaps';
import { NextRouter } from 'next/router';
import React from 'react';

import { ANALYTICS_DOMAIN } from 'utils';

import * as api from '../../analytics-api';
import styles from '../../analytics.module.scss';
import FadeIn from '../../fade-in';
import LazyLoader from '../../lazy-loader';
import numberFormatter from '../../number-formatter';
import { navigateToQuery } from '../../query';
import { Timer } from '../../timer';
import { Props } from '../../type';
import MoreLink from '../more-link';

interface CountriesProps extends Props {
  timer: Timer;
  router: NextRouter;
  isDarkMode: boolean;
}

interface CountryItem {
  count: number;
  name: string;
  percentage: number;
}

interface CountriesState {
  countries: CountryItem[] | null;
  loading: boolean;
}

export class CountriesMap extends React.Component<
  CountriesProps,
  CountriesState
> {
  private map: Datamap;

  state: CountriesState = {
    loading: true,
    countries: null,
  };

  componentDidUpdate(prevProps: CountriesProps) {
    if (
      this.props.query !== prevProps.query ||
      prevProps.isDarkMode !== this.props.isDarkMode
    ) {
      this.setState({ loading: true, countries: null });
      this.fetchCountries().then(this.drawMap);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeMap);
  }

  onVisible = () => {
    this.fetchCountries().then(this.drawMap);
    window.addEventListener('resize', this.resizeMap);
    this.props.timer.onTick(this.updateCountries.bind(this));
  };

  getDataset = () => {
    const dataset: Record<string, any> = {};

    const onlyValues =
      this.state.countries?.map(function (obj: CountryItem) {
        return obj.count;
      }) || [];
    const maxValue = Math.max.apply(null, onlyValues);

    const paletteScale = d3.scale
      .linear()
      .domain([0, maxValue])
      .range([
        // @ts-ignore
        this.props.isDarkMode ? '#2e3954' : '#f3ebff',
        // @ts-ignore
        this.props.isDarkMode ? '#6366f1' : '#a779e9',
      ]);

    this.state.countries?.forEach((item) => {
      dataset[item.name] = {
        numberOfThings: item.count,
        fillColor: paletteScale(item.count),
      };
    });

    return dataset;
  };

  updateCountries = () => {
    this.fetchCountries().then(() => {
      this.map?.updateChoropleth(this.getDataset(), { reset: true });
    });
  };

  fetchCountries() {
    return api
      .getStats(
        `/api/stats/${ANALYTICS_DOMAIN}/countries`,
        this.props.site,
        this.props.query,
        {
          limit: 300,
        },
      )
      .then((res) => this.setState({ loading: false, countries: res }));
  }

  resizeMap = () => {
    this.map?.resize();
  };

  drawMap = () => {
    const dataset = this.getDataset();
    const label =
      this.props.query.period === 'realtime' ? 'Current visitors' : 'Visitors';
    const defaultFill = this.props.isDarkMode ? '#2d3747' : '#f8fafc';
    const highlightFill = this.props.isDarkMode ? '#374151' : '#F5F5F5';
    const borderColor = this.props.isDarkMode ? '#1f2937' : '#dae1e7';
    const highlightBorderColor = this.props.isDarkMode
      ? `hsl(var(--tw-colors-primary-700))`
      : `hsl(var(--tw-colors-primary-900))`;

    this.map = new Datamap({
      element: document.querySelector('#map-container'),
      responsive: true,
      projection: 'mercator',
      fills: { defaultFill },
      data: dataset,
      geographyConfig: {
        borderColor,
        highlightBorderWidth: 2,
        highlightFillColor: (geo: any) => geo.fillColor || highlightFill,
        highlightBorderColor,
        popupTemplate: (geo: any, data: any) => {
          if (!data) {
            return null;
          }
          const pluralizedLabel =
            data.numberOfThings === 1 ? label.slice(0, -1) : label;
          return [
            `<div class="${styles['hoverinfo']} bg-gray-100 dark:bg-gray-850 dark:shadow-gray-850 dark:border-gray-850 dark:text-grayd-1100">`,
            '<strong>',
            geo.properties.name,
            ' </strong>',
            '<br><strong class="dark:text-indigo-800">',
            numberFormatter(data.numberOfThings),
            '</strong> ',
            pluralizedLabel,
            '</div>',
          ].join('');
        },
      },
      done: (datamap: Datamap) => {
        datamap.svg
          .selectAll('.datamaps-subunit')
          .on('click', (geography: any) => {
            navigateToQuery(this.props.router, this.props.query, {
              country: geography.id,
            });
          });
      },
    });
  };

  geolocationDbNotice() {
    if (this.props.site.selfhosted) {
      return (
        <span className="absolute bottom-4 right-3 text-xs text-gray-1000">
          IP Geolocation by{' '}
          <a
            target="_blank"
            href="https://db-ip.com"
            rel="noreferrer"
            className="text-blue-1000"
          >
            DB-IP
          </a>
        </span>
      );
    }

    return null;
  }

  renderBody() {
    if (this.state.countries) {
      return (
        <>
          <div
            className="mx-auto mt-4"
            style={{ width: '100%', maxWidth: '475px', height: '335px' }}
            id="map-container"
          ></div>
          <MoreLink
            site={this.props.site}
            list={this.state.countries}
            endpoint="countries"
          />
          {this.geolocationDbNotice()}
        </>
      );
    }

    return null;
  }

  render() {
    return (
      <LazyLoader onVisible={this.onVisible}>
        {this.state.loading && (
          <div className={clsx('mx-auto my-32', styles.loading)}>
            <div></div>
          </div>
        )}
        <FadeIn show={!this.state.loading}>{this.renderBody()}</FadeIn>
      </LazyLoader>
    );
  }
}
