import { NextRouter } from 'next/router';
import React from 'react';

import { Tabs } from '../../../../components';
import { useIsDarkMode } from '../../../../hooks/use-is-dark-mode';
import * as api from '../../analytics-api';
import { Timer } from '../../timer';
import { Props } from '../../type';
import { apiPath, sitePath } from '../../url';
import { AnalyticsCard, CardHeader } from '../fine-components';
import ListReport from '../reports/list';
import { CountriesMap } from './countries-map';

interface LocationsProps extends Props {
  timer: Timer;
  router: NextRouter;
}

export default function Locations(props: LocationsProps): JSX.Element {
  const isDarkMode = useIsDarkMode();
  return (
    <AnalyticsCard>
      <Tabs
        cacheKey="analytics.locations"
        initialValue="map"
        leftItem={<CardHeader>Locations</CardHeader>}
      >
        <Tabs.Item label="Map" value="map">
          <CountriesMap
            router={props.router}
            site={props.site}
            query={props.query}
            timer={props.timer}
            isDarkMode={isDarkMode}
          />
        </Tabs.Item>
        <Tabs.Item label="Countries" value="countries">
          <Countries site={props.site} query={props.query} />
        </Tabs.Item>
        {props.site.cities && (
          <>
            <Tabs.Item label="Regions" value="regions">
              <Regions site={props.site} query={props.query} />
            </Tabs.Item>
            <Tabs.Item label="Cities" value="cities">
              <Cities site={props.site} query={props.query} />
            </Tabs.Item>
          </>
        )}
      </Tabs>
    </AnalyticsCard>
  );
}

function Countries({ query, site }: Props) {
  function fetchData() {
    return api.getStats(apiPath(site, '/countries'), site, query, { limit: 9 });
  }

  function renderIcon(country: any) {
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
      color="orange"
    />
  );
}

interface Region {
  country_flag: string;
}

function Regions({ query, site }: Props) {
  function fetchData() {
    return api.getStats(apiPath(site, '/regions'), site, query, {
      country_name: query.filters.country,
      limit: 9,
    });
  }

  function renderIcon(region: Region) {
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
      color="orange"
    />
  );
}

function Cities({ query, site }: Props) {
  function fetchData() {
    return api.getStats(apiPath(site, '/cities'), site, query, { limit: 9 });
  }

  return (
    <ListReport
      fetchData={fetchData}
      filter={{ city: 'code', city_name: 'name' }}
      keyLabel="City"
      detailsLink={sitePath(site, '/cities')}
      query={query}
      color="orange"
    />
  );
}
