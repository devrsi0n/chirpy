import { ANALYTICS_DOMAIN } from '@chirpy-dev/utils';
import React from 'react';

import { Link } from '../../components/link';
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
        `/api/stats/${ANALYTICS_DOMAIN}/current-visitors`,
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
          className="ml-1 mr-auto block text-xs font-bold text-gray-1000 md:ml-2 md:text-sm"
        >
          <svg
            className="mr-1 inline w-2 fill-current text-green-500 md:mr-2"
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
