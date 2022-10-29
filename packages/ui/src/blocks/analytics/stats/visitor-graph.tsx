import { ANALYTICS_DOMAIN } from '@chirpy-dev/utils';
import Chart from 'chart.js/auto';
import clsx from 'clsx';
import { NextRouter } from 'next/router';
import React from 'react';

import { useIsDarkMode } from '../../../hooks/use-is-dark-mode';
import * as api from '../analytics-api';
import styles from '../analytics.module.scss';
import LazyLoader from '../lazy-loader';
import numberFormatter, { durationFormatter } from '../number-formatter';
import { navigateToQuery } from '../query';
import { Timer } from '../timer';
import { Props } from '../type';

function buildDataSet(
  plot: string,
  present_index: number,
  ctx: {
    createLinearGradient: (
      arg0: number,
      arg1: number,
      arg2: number,
      arg3: number,
    ) => any;
  },
  label: string,
) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'hsl(252, 56.0%, 57.5%, 0.2)');
  gradient.addColorStop(1, 'hsl(252, 56.0%, 57.5%, 0)');
  const borderColor = 'hsl(252, 56.0%, 57.5%)';
  const pointBackgroundColor = borderColor;

  if (present_index) {
    const dashedPart = plot.slice(present_index - 1, present_index + 1);
    const dashedPlot = [
      ...Array.from({ length: present_index - 1 }),
      ...dashedPart,
    ];
    for (let i = present_index; i < plot.length; i++) {
      // @ts-ignore
      plot[i] = undefined;
    }

    return [
      {
        label: label,
        data: plot,
        borderWidth: 3,
        borderColor,
        pointBackgroundColor,
        backgroundColor: gradient,
        fill: true,
      },
      {
        label: label,
        data: dashedPlot,
        borderWidth: 3,
        borderDash: [5, 10],
        borderColor,
        pointBackgroundColor,
        backgroundColor: gradient,
        fill: true,
      },
    ];
  } else {
    return [
      {
        label: label,
        data: plot,
        borderWidth: 3,
        borderColor,
        pointBackgroundColor,
        backgroundColor: gradient,
        fill: true,
      },
    ];
  }
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

const MONTHS_ABBREV = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

const DAYS_ABBREV = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function dateFormatter(interval: string, longForm?: boolean) {
  return function (isoDate: string) {
    let date = new Date(isoDate);

    switch (interval) {
      case 'month': {
        return MONTHS[date.getUTCMonth()];
      }
      case 'date': {
        const day = DAYS_ABBREV[date.getUTCDay()];
        const date_ = date.getUTCDate();
        const month = MONTHS_ABBREV[date.getUTCMonth()];
        return day + ', ' + date_ + ' ' + month;
      }
      case 'hour': {
        const parts = isoDate.split(/\D/);
        date = new Date(
          +parts[0],
          +parts[1] - 1,
          +parts[2],
          +parts[3],
          +parts[4],
          +parts[5],
        );
        let hours = date.getHours(); // Not sure why getUTCHours doesn't work here
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        return hours + ampm;
      }
      case 'minute': {
        if (longForm) {
          const minutesAgo = Math.abs(+isoDate);
          return minutesAgo === 1
            ? '1 minute ago'
            : minutesAgo + ' minutes ago';
        } else {
          return isoDate + 'm';
        }
      }
      // No default
    }
  };
}

interface GraphData {
  interval: string;
  labels: string[];
  plot: string;
  present_index: number;
  sample_percent: number;
}

interface LineGraphProps extends Props {
  graphData: GraphData;
  darkTheme: boolean;
  router: NextRouter;
}

interface LineGraphState {
  exported: boolean;
}

class LineGraph extends React.Component<LineGraphProps, LineGraphState> {
  ctx: any;
  chart: Chart<'line', string, string>;

  state: LineGraphState = {
    exported: false,
  };

  regenerateChart = () => {
    const { graphData, query, darkTheme } = this.props;
    this.ctx = (
      document.querySelector('#main-graph-canvas') as HTMLCanvasElement
    ).getContext('2d');
    const label = query.filters.goal
      ? 'Converted visitors'
      : graphData.interval === 'minute'
      ? 'Pageviews'
      : 'Visitors';
    const dataSet = buildDataSet(
      graphData.plot,
      graphData.present_index,
      this.ctx,
      label,
    );

    return new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: graphData.labels,
        // @ts-ignore
        datasets: dataSet,
      },
      options: {
        animation: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: 'index',
            intersect: false,
            titleFont: { size: 18 },
            footerFont: { size: 14 },
            bodyFont: { size: 14 },
            backgroundColor: 'rgba(25, 30, 56)',
            titleMarginBottom: 8,
            bodySpacing: 6,
            footerMarginTop: 8,
            // @ts-ignore
            padding: { x: 10, y: 10 },
            multiKeyBackground: 'none',
            callbacks: {
              // @ts-ignore
              title: function (dataPoints) {
                const data = dataPoints[0];
                return dateFormatter(graphData.interval, true)(data.label);
              },
              // @ts-ignore
              beforeBody: function () {
                // @ts-ignore
                this.drawnLabels = {};
              },
              // @ts-ignore
              label: function (item) {
                const dataset = item.dataset;
                // @ts-ignore
                if (!this.drawnLabels[dataset.label]) {
                  // @ts-ignore
                  this.drawnLabels[dataset.label] = true;
                  const pluralizedLabel =
                    item.formattedValue === '1'
                      ? // @ts-ignore
                        dataset.label.slice(0, -1)
                      : dataset.label;
                  return ` ${item.formattedValue} ${pluralizedLabel}`;
                }
              },
              // @ts-ignore
              footer: function (_dataPoints) {
                if (graphData.interval === 'month') {
                  return 'Click to view month';
                } else if (graphData.interval === 'date') {
                  return 'Click to view day';
                }
              },
            },
          },
        },
        responsive: true,
        onResize: this.updateWindowDimensions,
        elements: { line: { tension: 0 }, point: { radius: 0 } },
        onClick: this.onClick.bind(this),
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              // @ts-ignore
              callback: numberFormatter,
              maxTicksLimit: 8,
              color: darkTheme ? `hsl(var(--tw-colors-grayd-1200))` : undefined,
            },
            grid: {
              // @ts-ignore
              zeroLineColor: 'transparent',
              drawBorder: false,
            },
          },
          x: {
            grid: { display: false },
            ticks: {
              maxTicksLimit: 8,
              callback: function (val, _index, _ticks) {
                return dateFormatter(graphData.interval)(
                  // @ts-ignore
                  this.getLabelForValue(val),
                );
              },
              color: darkTheme ? `hsl(var(--tw-colors-grayd-1200))` : undefined,
            },
          },
        },
      },
    });
  };

  componentDidMount() {
    this.chart = this.regenerateChart();
  }

  componentDidUpdate(prevProps: LineGraphProps) {
    if (this.props.graphData !== prevProps.graphData) {
      const label = this.props.query.filters.goal
        ? 'Converted visitors'
        : this.props.graphData.interval === 'minute'
        ? 'Pageviews'
        : 'Visitors';
      const newDataset = buildDataSet(
        this.props.graphData.plot,
        this.props.graphData.present_index,
        this.ctx,
        label,
      );

      for (let i = 0; i < newDataset[0].data.length; i++) {
        // @ts-ignore
        this.chart.data.datasets[0].data[i] = newDataset[0].data[i];
      }

      this.chart.update();
    }
  }

  /**
   * The current ticks' limits are set to treat iPad (regular/Mini/Pro) as a regular screen.
   * @param {*} chart - The chart instance.
   * @param {*} dimensions - An object containing the new dimensions *of the chart.*
   */
  updateWindowDimensions = (chart: any, dimensions: any) => {
    chart.options.scales.x.ticks.maxTicksLimit = dimensions.width < 720 ? 5 : 8;
    chart.options.scales.y.ticks.maxTicksLimit =
      dimensions.height < 233 ? 3 : 8;
  };

  onClick(e: any) {
    // @ts-ignore
    const element = this.chart.getElementsAtEventForMode(e, 'index', {
      intersect: false,
    })[0];
    // @ts-ignore
    const date = this.chart.data.labels[element.index];

    if (this.props.graphData.interval === 'month') {
      navigateToQuery(this.props.router, this.props.query, {
        period: 'month',
        date,
      });
    } else if (this.props.graphData.interval === 'date') {
      navigateToQuery(this.props.router, this.props.query, {
        period: 'day',
        date,
      });
    }
  }

  renderComparison(name: string, comparison: number) {
    const formattedComparison = numberFormatter(Math.abs(comparison));

    if (comparison > 0) {
      const color = name === 'Bounce rate' ? `text-red-900` : `text-green-900`;
      return (
        <span className="text-xs text-gray-1200">
          <span className={clsx(color, `font-bold`)}>&uarr;</span>{' '}
          {formattedComparison}%
        </span>
      );
    } else if (comparison < 0) {
      const color = name === 'Bounce rate' ? 'text-green-900' : 'text-red-900';
      return (
        <span className="text-xs">
          <span className={clsx(color, `font-bold`)}>&darr;</span>{' '}
          {formattedComparison}%
        </span>
      );
    } else if (comparison === 0) {
      return <span className="text-xs text-gray-1100">&#12336; N/A</span>;
    }
  }

  topStatNumberShort(stat: any) {
    if (['visit duration', 'time on page'].includes(stat.name.toLowerCase())) {
      return durationFormatter(stat.value);
    } else if (
      ['bounce rate', 'conversion rate'].includes(stat.name.toLowerCase())
    ) {
      return stat.value + '%';
    } else {
      return numberFormatter(stat.value);
    }
  }

  topStatTooltip(stat: any) {
    if (typeof stat.value == 'number') {
      let name = stat.name.toLowerCase();
      name = stat.value === 1 ? name.slice(0, -1) : name;
      return stat.value.toLocaleString() + ' ' + name;
    }
  }

  renderTopStats() {
    const { graphData } = this.props;
    // @ts-ignore
    const stats = graphData.top_stats.map((stat, index) => {
      let border = index > 0 ? 'lg:border-l border-gray-1100' : '';
      border = index % 2 === 0 ? border + ' border-r lg:border-r-0' : border;

      return (
        <div className={`my-4 w-1/2 px-8 lg:w-auto ${border}`} key={stat.name}>
          <div className="whitespace-nowrap text-xs font-bold uppercase tracking-wide text-gray-1100">
            {stat.name}
          </div>
          <div className="my-1 flex items-center justify-between whitespace-nowrap">
            <strong
              className="mr-4 text-xl text-gray-1200 md:text-2xl"
              tooltip={this.topStatTooltip(stat)}
            >
              {this.topStatNumberShort(stat)}
            </strong>
            {this.renderComparison(stat.name, stat.change)}
          </div>
        </div>
      );
    });

    if (graphData.interval === 'minute') {
      stats.push(
        <div
          key="dot"
          className="pulsating-circle block"
          style={{ left: '125px', top: '52px' }}
        ></div>,
      );
    }

    return stats;
  }

  pollExportReady = () => {
    if (document.cookie.includes('exporting')) {
      setTimeout(this.pollExportReady, 1000);
    } else {
      this.setState({ exported: false });
    }
  };

  downloadSpinner() {
    this.setState({ exported: true });
    // eslint-disable-next-line unicorn/no-document-cookie
    document.cookie = 'exporting=';
    setTimeout(this.pollExportReady, 1000);
  }

  downloadLink() {
    if (this.props.query.period !== 'realtime') {
      if (this.state.exported) {
        return (
          <svg
            className="absolute -top-8 right-8 h-4 w-4 animate-spin text-indigo-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        );
      } else {
        const endpoint = `/${encodeURIComponent(
          this.props.site.domain,
        )}/export${api.serializeQuery(this.props.query, this.props.site)}`;

        return (
          <a href={endpoint} download onClick={this.downloadSpinner.bind(this)}>
            <svg
              className={clsx(
                'absolute -top-8 right-8 h-5 w-4 text-gray-700 dark:text-gray-300',
                styles.feather,
              )}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </a>
        );
      }
    }
  }

  samplingNotice() {
    const samplePercent = this.props.graphData.sample_percent;

    if (samplePercent < 100) {
      return (
        <div
          tooltip={`Stats based on a ${samplePercent}% sample of all visitors`}
          className="absolute -top-8 right-14 cursor-pointer lg:-top-20 lg:right-8"
        >
          <svg
            className="h-4 w-4 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      );
    }
  }

  render() {
    const extraClass =
      this.props.graphData.interval === 'hour' ? '' : 'cursor-pointer';

    return (
      <div className="graph-inner">
        <div className="flex flex-wrap">{this.renderTopStats()}</div>
        <div className="relative px-2">
          {/* {this.downloadLink()} */}
          {this.samplingNotice()}
          <canvas
            id="main-graph-canvas"
            className={'mt-4 ' + extraClass}
            width="1054"
            height="342"
          ></canvas>
        </div>
      </div>
    );
  }
}

const LineGraphWithRouter = LineGraph;

interface VisitorGraphProps extends Props {
  timer: Timer;
  router: NextRouter;
}

export default function VisitorGraph(props: VisitorGraphProps) {
  const [graphData, setGraphData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const isDarkMode = useIsDarkMode();

  const onVisible = () => {
    fetchGraphData();
    if (props.timer) props.timer.onTick(fetchGraphData);
  };
  const fetchGraphData = React.useCallback(() => {
    api
      .getStats(
        `/api/stats/${ANALYTICS_DOMAIN}/main-graph`,
        props.site,
        props.query,
      )
      .then((res) => {
        setLoading(false);
        setGraphData(res);
        return res;
      });
  }, [props.site, props.query]);
  React.useEffect(() => {
    setLoading(true);
    setGraphData(null);
    fetchGraphData();
  }, [props.query, isDarkMode, fetchGraphData]);
  return (
    <LazyLoader onVisible={onVisible}>
      <div
        className={clsx(
          'main-graph relative w-full rounded bg-white shadow-xl dark:bg-gray-825',
          loading && `z-20`,
        )}
      >
        {loading && (
          <div className="graph-inner">
            <div
              className={clsx(
                'mx-auto pt-24 sm:pt-32 md:pt-48',
                styles.loading,
              )}
            >
              <div></div>
            </div>
          </div>
        )}
        {graphData && (
          <LineGraphWithRouter
            router={props.router}
            graphData={graphData}
            site={props.site}
            query={props.query}
            darkTheme={isDarkMode}
          />
        )}
      </div>
    </LazyLoader>
  );
}
