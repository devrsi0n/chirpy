import React from 'react';

import { Link } from '$/components/Link';

import * as api from '../analytics-api';
import { appliedFilters } from '../query';
import { Timer } from '../timer';
import { Props } from '../type';
import * as url from '../url';

export interface CurrentVisitorsProps extends Props {
  timer: Timer;
}

interface CurrentVisitorsState {
  currentVisitors: any;
}
export default class CurrentVisitors extends React.Component<CurrentVisitorsProps> {
  state: CurrentVisitorsState = { currentVisitors: null };

  componentDidMount() {
    this.updateCount();
    this.props.timer.onTick(this.updateCount);
  }

  updateCount = () => {
    return api
      .getStats(
        `/api/stats/${encodeURIComponent(this.props.site.domain)}/current-visitors`,
        this.props.site,
      )
      .then((res) => this.setState({ currentVisitors: res }));
  };

  render() {
    if (appliedFilters(this.props.query).length > 0) {
      return null;
    }
    const { currentVisitors } = this.state;

    if (currentVisitors !== null) {
      return (
        <Link
          href={url.setQuery('period', 'realtime')}
          disabled
          className="block ml-1 md:ml-2 mr-auto text-xs md:text-sm font-bold text-gray-1000"
        >
          <svg
            className="inline w-2 mr-1 md:mr-2 text-green-500 fill-current"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="8" />
          </svg>
          {currentVisitors}{' '}
          <span className="hidden sm:inline-block">
            current visitor{currentVisitors === 1 ? '' : 's'}
          </span>
        </Link>
      );
    }

    return null;
  }
}
