import React from 'react';
import 'twin.macro';

import * as api from '../../api';
import * as storage from '../../storage';
import { cardTitle, tabContainer } from '../../styles';
import { apiPath, sitePath } from '../../url';
import ListReport from '../reports/list';
import CountriesMap from './map';

function Countries({ query, site }) {
  function fetchData() {
    return api.get(apiPath(site, '/countries'), query, { limit: 9 }).then((res) => {
      return res.map((row) => Object.assign({}, row, { percentage: undefined }));
    });
  }

  function renderIcon(country) {
    return site.cities && <span className="mr-1">{country.flag}</span>;
  }

  return (
    <ListReport
      fetchData={fetchData}
      filter={{ country: 'code', country_name: 'name' }}
      keyLabel="Country"
      detailsLink={sitePath(site, '/countries')}
      query={query}
      renderIcon={renderIcon}
      color="bg-orange-50"
    />
  );
}

function Regions({ query, site }) {
  function fetchData() {
    return api.get(apiPath(site, '/regions'), query, {
      country_name: query.filters.country,
      limit: 9,
    });
  }

  function renderIcon(region) {
    return <span className="mr-1">{region.country_flag}</span>;
  }

  return (
    <ListReport
      fetchData={fetchData}
      filter={{ region: 'code', region_name: 'name' }}
      keyLabel="Region"
      detailsLink={sitePath(site, '/regions')}
      query={query}
      renderIcon={renderIcon}
      color="bg-orange-50"
    />
  );
}

function Cities({ query, site }) {
  function fetchData() {
    return api.get(apiPath(site, '/cities'), query, { limit: 9 });
  }

  return (
    <ListReport
      fetchData={fetchData}
      filter={{ city: 'code', city_name: 'name' }}
      keyLabel="City"
      detailsLink={sitePath(site, '/cities')}
      query={query}
      color="bg-orange-50"
    />
  );
}

const labelFor = {
  countries: 'Countries',
  regions: 'Regions',
  cities: 'Cities',
};

export default class Locations extends React.Component {
  constructor(props) {
    super(props);
    this.tabKey = `geoTab__${props.site.domain}`;
    const storedTab = storage.getItem(this.tabKey);
    this.state = {
      mode: storedTab || 'map',
    };
  }

  setMode(mode) {
    return () => {
      storage.setItem(this.tabKey, mode);
      this.setState({ mode });
    };
  }

  renderContent() {
    switch (this.state.mode) {
      case 'cities':
        return <Cities site={this.props.site} query={this.props.query} timer={this.props.timer} />;
      case 'regions':
        return <Regions site={this.props.site} query={this.props.query} timer={this.props.timer} />;
      case 'countries':
        return (
          <Countries site={this.props.site} query={this.props.query} timer={this.props.timer} />
        );
      case 'map':
      default:
        return (
          <CountriesMap site={this.props.site} query={this.props.query} timer={this.props.timer} />
        );
    }
  }

  renderPill(name, mode) {
    const isActive = this.state.mode === mode;

    if (isActive) {
      return (
        <li className="inline-block h-5 text-indigo-700 dark:text-indigo-500 font-bold active-prop-heading">
          {name}
        </li>
      );
    }

    return (
      <li className="hover:text-indigo-600 cursor-pointer" onClick={this.setMode(mode)}>
        {name}
      </li>
    );
  }

  render() {
    return (
      <div className="stats-item flex flex-col w-full mt-6 stats-item--has-header">
        <div className="stats-item-header flex flex-col flex-grow bg-white dark:bg-gray-825 shadow-xl rounded p-4 relative">
          <div className="w-full flex justify-between">
            <h3 css={cardTitle}>{labelFor[this.state.mode] || 'Locations'}</h3>
            <ul css={tabContainer}>
              {this.renderPill('Map', 'map')}
              {this.renderPill('Countries', 'countries')}
              {this.props.site.cities && this.renderPill('Regions', 'regions')}
              {this.props.site.cities && this.renderPill('Cities', 'cities')}
            </ul>
          </div>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}
