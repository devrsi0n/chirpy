import React from 'react';
import 'twin.macro';

import { Link } from '$/components/Link';

import * as api from '../../api';
import LazyLoader from '../../lazy-loader';
import numberFormatter from '../../number-formatter';
import { Query } from '../../query';
import { cardTitle, labelContainer } from '../../styles';
import { Goal, Site } from '../../type';
import * as url from '../../url';
import Bar from '../bar';
import PropBreakdown from './prop-breakdown';

const MOBILE_UPPER_WIDTH = 767;
const DEFAULT_WIDTH = 1080;

export interface ConversionsProps {
  site: Site;
  query: Query;
  title: string;
}

interface ConversionsState {
  loading: boolean;
  viewport: number;
  prevHeight: number | null;
  goals: Goal[] | null;
}

export default class Conversions extends React.Component<ConversionsProps, ConversionsState> {
  htmlNode: React.RefObject<any> = React.createRef();
  state: ConversionsState = {
    loading: true,
    viewport: DEFAULT_WIDTH,
    prevHeight: null,
    goals: null,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize, false);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false);
  }

  handleResize = () => {
    this.setState({ viewport: window.innerWidth });
  };

  onVisible = () => {
    this.fetchConversions();
  };

  componentDidUpdate(prevProps: ConversionsProps) {
    if (this.props.query !== prevProps.query) {
      const height = this.htmlNode.current?.element.offsetHeight;
      this.setState({ loading: true, goals: null, prevHeight: height });
      this.fetchConversions();
    }
  }

  getBarMaxWidth() {
    const { viewport } = this.state;
    return viewport > MOBILE_UPPER_WIDTH ? '16rem' : '10rem';
  }

  fetchConversions() {
    api
      .get(`/api/stats/${encodeURIComponent(this.props.site.domain)}/conversions`, this.props.query)
      .then((res) => this.setState({ loading: false, goals: res, prevHeight: null }));
  }

  renderGoalText(goalName: string) {
    return this.props.query.period === 'realtime' ? (
      <span className="block px-2 py-1.5 relative z-9 md:truncate break-all dark:text-gray-200">
        {goalName}
      </span>
    ) : (
      <Link
        disabled
        href={url.setQuery('goal', goalName)}
        className="block px-2 py-1.5 hover:underline relative z-9 break-all lg:truncate dark:text-gray-200"
      >
        {goalName}
      </Link>
    );
  }

  renderGoal = (goal: Goal) => {
    const { viewport, goals } = this.state;
    const renderProps = this.props.query.filters['goal'] == goal.name && goal.prop_names;

    return (
      <div className="my-2 text-sm" key={goal.name}>
        <div className="flex items-center justify-between my-2">
          <Bar
            count={goal.unique_conversions}
            all={goals!}
            className="bg-red-50 dark:bg-gray-500 dark:bg-opacity-15"
            maxWidthDeduction={this.getBarMaxWidth()}
          >
            {this.renderGoalText(goal.name)}
          </Bar>
          <div className="dark:text-gray-200">
            <span className="inline-block w-20 font-medium text-right">
              {numberFormatter(goal.unique_conversions)}
            </span>
            {viewport > MOBILE_UPPER_WIDTH && (
              <span className="inline-block w-20 font-medium text-right">
                {numberFormatter(goal.total_conversions)}
              </span>
            )}
            <span className="inline-block w-20 font-medium text-right">
              {goal.conversion_rate}%
            </span>
          </div>
        </div>
        {renderProps && (
          <PropBreakdown site={this.props.site} query={this.props.query} goal={goal} />
        )}
      </div>
    );
  };

  renderInner() {
    const { viewport, loading, goals } = this.state;
    if (loading) {
      return (
        <div className="mx-auto my-2 loading">
          <div></div>
        </div>
      );
    } else if (goals) {
      return (
        <React.Fragment>
          <h3 css={cardTitle}>{this.props.title || 'Goal Conversions'}</h3>
          <div css={labelContainer}>
            <span>Goal</span>
            <div className="text-right">
              <span className="inline-block w-20">Uniques</span>
              {viewport > MOBILE_UPPER_WIDTH && <span className="inline-block w-20">Total</span>}
              <span className="inline-block w-20">CR</span>
            </div>
          </div>

          {goals.map((element) => this.renderGoal(element))}
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <LazyLoader
        className="w-full p-4 bg-white rounded shadow-xl dark:bg-gray-825"
        style={{ minHeight: '132px', height: this.state.prevHeight ?? 'auto' }}
        onVisible={this.onVisible}
        ref={this.htmlNode}
      >
        {this.renderInner()}
      </LazyLoader>
    );
  }
}
