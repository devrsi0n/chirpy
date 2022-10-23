import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { NextRouter, useRouter } from 'next/router';
import React, { Fragment } from 'react';
import Flatpickr, { DateTimePickerProps } from 'react-flatpickr';

import { IconChevronDown } from '../../components/icons';

import styles from './analytics.module.scss';
import {
  shiftDays,
  shiftMonths,
  formatDay,
  formatDayShort,
  formatMonthYYYY,
  formatISO,
  isToday,
  lastMonth,
  nowForSite,
  isSameMonth,
  isThisMonth,
  parseUTCDate,
  isBefore,
  isAfter,
} from './date';
import { navigateToQuery, QueryLink, QueryButton, Query } from './query';
import { listItem } from './styles';
import { Props, Site } from './type';

interface ArrowProps {
  query: Query;
  site: Site;
  period: 'day' | 'month';
  prevDate: string;
  nextDate: string;
}

function RenderArrow({ query, site, period, prevDate, nextDate }: ArrowProps) {
  const router = useRouter();
  const insertionDate = parseUTCDate(site.insertedAt);
  const disabledLeft = isBefore(parseUTCDate(prevDate), insertionDate, period);
  const disabledRight = isAfter(
    parseUTCDate(nextDate),
    nowForSite(site),
    period,
  );

  const leftClasses = `flex items-center px-1 sm:px-2 border-r border-gray-300 rounded-l
      dark:border-gray-500 dark:text-gray-100 ${
        disabledLeft
          ? 'bg-gray-300 dark:bg-gray-950'
          : 'hover:bg-gray-100 dark:hover:bg-gray-900'
      }`;
  const rightClasses = `flex items-center px-1 sm:px-2 rounded-r dark:text-gray-100 ${
    disabledRight
      ? 'bg-gray-300 dark:bg-gray-950'
      : 'hover:bg-gray-100 dark:hover:bg-gray-900'
  }`;
  return (
    <div className="mr-2 flex cursor-pointer rounded bg-white shadow dark:bg-gray-800 sm:mr-4">
      <QueryButton
        router={router}
        to={{ date: prevDate }}
        query={query}
        className={leftClasses}
        disabled={disabledLeft}
      >
        <svg
          className={clsx('h-4 w-4', styles.feather)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </QueryButton>
      <QueryButton
        router={router}
        to={{ date: nextDate }}
        query={query}
        className={rightClasses}
        disabled={disabledRight}
      >
        <svg
          className={clsx('h-4 w-4', styles.feather)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </QueryButton>
    </div>
  );
}

function DatePickerArrows({ site, query }: Props) {
  if (query.period === 'month') {
    const prevDate = formatISO(shiftMonths(query.date, -1));
    const nextDate = formatISO(shiftMonths(query.date, 1));

    return (
      <RenderArrow
        query={query}
        site={site}
        period="month"
        prevDate={prevDate}
        nextDate={nextDate}
      />
    );
  }
  if (query.period === 'day') {
    const prevDate = formatISO(shiftDays(query.date, -1));
    const nextDate = formatISO(shiftDays(query.date, 1));

    return (
      <RenderArrow
        query={query}
        site={site}
        period="day"
        prevDate={prevDate}
        nextDate={nextDate}
      />
    );
  }

  return null;
}

interface DatePickerProps extends Props {
  router: NextRouter;
  leadingText?: string;
}

interface DatePickerState {
  mode: string;
  open: boolean;
}

class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
  state = { mode: 'menu', open: false };
  dropDownNode: HTMLElement;
  calendar: Flatpickr;

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleKeydown = (e: any) => {
    const { query, site } = this.props;

    if (e.target.tagName === 'INPUT') return true;
    if (
      e.ctrlKey ||
      e.metaKey ||
      e.altKey ||
      e.isComposing ||
      e.keyCode === 229
    )
      return true;

    const newSearch: any = {
      period: false,
      from: false,
      to: false,
      date: false,
    };

    const insertionDate = parseUTCDate(site.insertedAt);

    if (e.key === 'ArrowLeft') {
      const prevDate = formatISO(shiftDays(query.date, -1));
      const prevMonth = formatISO(shiftMonths(query.date, -1));

      if (
        query.period === 'day' &&
        !isBefore(parseUTCDate(prevDate), insertionDate, query.period)
      ) {
        newSearch.period = 'day';
        newSearch.date = prevDate;
      } else if (
        query.period === 'month' &&
        !isBefore(parseUTCDate(prevMonth), insertionDate, query.period)
      ) {
        newSearch.period = 'month';
        newSearch.date = prevMonth;
      }
    } else if (e.key === 'ArrowRight') {
      const nextDate = formatISO(shiftDays(query.date, 1));
      const nextMonth = formatISO(shiftMonths(query.date, 1));

      if (
        query.period === 'day' &&
        !isAfter(parseUTCDate(nextDate), nowForSite(site), query.period)
      ) {
        newSearch.period = 'day';
        newSearch.date = nextDate;
      } else if (
        query.period === 'month' &&
        !isAfter(parseUTCDate(nextMonth), nowForSite(site), query.period)
      ) {
        newSearch.period = 'month';
        newSearch.date = nextMonth;
      }
    }

    this.setState({ open: false });

    const keys = ['d', 'r', 'w', 'm', 'y', 't', 's'];
    const redirects = [
      { date: false, period: 'day' },
      { period: 'realtime' },
      { date: false, period: '7d' },
      { date: false, period: 'month' },
      { date: false, period: '12mo' },
      { date: false, period: '30d' },
      { date: false, period: '6mo' },
    ];

    const { router } = this.props;

    if (keys.includes(e.key.toLowerCase())) {
      navigateToQuery(router, query, {
        ...newSearch,
        ...redirects[keys.indexOf(e.key.toLowerCase())],
      });
    } else if (e.key.toLowerCase() === 'c') {
      this.setState({ mode: 'calendar', open: true }, this.openCalendar);
    } else if (newSearch.date) {
      navigateToQuery(router, query, newSearch);
    }
  };

  handleClick = (e: any) => {
    if (this.dropDownNode && this.dropDownNode.contains(e.target)) return;

    this.setState({ open: false });
  };

  setCustomDate: DateTimePickerProps['onChange'] = (dates) => {
    const { router, query } = this.props;
    if (dates.length === 2) {
      const [from, to] = dates;
      if (formatISO(from) === formatISO(to)) {
        navigateToQuery(router, query, {
          period: 'day',
          date: formatISO(from),
          from: false,
          to: false,
        });
      } else {
        navigateToQuery(router, query, {
          period: 'custom',
          date: false,
          from: formatISO(from),
          to: formatISO(to),
        });
      }
      this.close();
    }
  };

  timeFrameText = () => {
    const { query, site } = this.props;

    if (query.period === 'day') {
      if (isToday(site, query.date)) {
        return 'Today';
      }
      return formatDay(query.date);
    }
    if (query.period === '7d') {
      return 'Last 7 days';
    }
    if (query.period === '30d') {
      return 'Last 30 days';
    }
    if (query.period === 'month') {
      if (isThisMonth(site, query.date)) {
        return 'Month to Date';
      }
      return formatMonthYYYY(query.date);
    }
    if (query.period === '6mo') {
      return 'Last 6 months';
    }
    if (query.period === '12mo') {
      return 'Last 12 months';
    }
    if (query.period === 'custom') {
      return `${formatDayShort(query.from!)} - ${formatDayShort(query.to!)}`;
    }
    return 'Realtime';
  };

  toggle = () => {
    const newMode =
      this.state.mode === 'calendar' && !this.state.open
        ? 'menu'
        : this.state.mode;
    this.setState((prevState) => ({ mode: newMode, open: !prevState.open }));
  };

  close = () => {
    this.setState({ open: false });
  };

  openCalendar = () => {
    this.calendar && this.calendar.flatpickr.open();
  };

  renderLink(period: any, text: any, opts: any = {}) {
    const { query, site } = this.props;
    let boldClass;
    if (query.period === 'day' && period === 'day') {
      boldClass = isToday(site, query.date) ? 'font-bold' : '';
    } else if (query.period === 'month' && period === 'month') {
      const linkDate = opts.date || nowForSite(site);
      boldClass = isSameMonth(linkDate, query.date) ? 'font-bold' : '';
    } else {
      boldClass = query.period === period ? 'font-bold' : '';
    }

    opts.date = opts.date ? formatISO(opts.date) : false;

    const keybinds = {
      Today: 'D',
      Realtime: 'R',
      'Last 7 days': 'W',
      'Month to Date': 'M',
      'Last 12 months': 'Y',
      'Last 6 months': 'S',
      'Last 30 days': 'T',
    };

    return (
      <QueryLink
        to={{ from: false, to: false, period, ...opts }}
        onClick={this.close}
        query={query}
        className={clsx(boldClass, listItem)}
      >
        {text}
        {/* @ts-ignore */}
        <span className="font-normal">{keybinds[text]}</span>
      </QueryLink>
    );
  }

  renderDropDownContent() {
    if (this.state.mode === 'menu') {
      return (
        <div
          id="datemenu"
          className="absolute left-0 right-0 z-10 mt-2 w-full origin-top-right md:absolute md:top-auto md:left-auto md:right-0 md:w-56"
        >
          <div
            className="rounded-md bg-white font-medium text-gray-800 shadow-md ring-1 ring-black
            ring-opacity-5 dark:bg-gray-500 dark:text-gray-200"
          >
            <div className="py-1">
              {this.renderLink('day', 'Today')}
              {this.renderLink('realtime', 'Realtime')}
            </div>
            <ListSeparatator />
            <div className="py-1">
              {this.renderLink('7d', 'Last 7 days')}
              {this.renderLink('30d', 'Last 30 days')}
            </div>
            <ListSeparatator />
            <div className="py-1">
              {this.renderLink('month', 'Month to Date')}
              {this.renderLink('month', 'Last month', {
                date: lastMonth(this.props.site),
              })}
            </div>
            <ListSeparatator />
            <div className="py-1">
              {this.renderLink('6mo', 'Last 6 months')}
              {this.renderLink('12mo', 'Last 12 months')}
            </div>
            <ListSeparatator />
            <div className="py-1">
              <span
                onClick={() =>
                  this.setState({ mode: 'calendar' }, this.openCalendar)
                }
                onKeyPress={() =>
                  this.setState({ mode: 'calendar' }, this.openCalendar)
                }
                className={listItem}
                tabIndex={0}
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                aria-controls="calendar"
              >
                Custom range
                <span className="font-normal">C</span>
              </span>
            </div>
          </div>
        </div>
      );
    }
    if (this.state.mode === 'calendar') {
      const insertionDate = new Date(this.props.site.insertedAt).getTime();
      const dayBeforeCreation = insertionDate - 86_400_000;
      return (
        <div className="h-0">
          <Flatpickr
            id="calendar"
            options={{
              mode: 'range',
              maxDate: 'today',
              minDate: dayBeforeCreation,
              showMonths: 1,
              static: true,
              animate: true,
            }}
            ref={(calendar) => (this.calendar = calendar!)}
            className="invisible"
            onChange={this.setCustomDate}
          />
        </div>
      );
    }
  }

  renderPicker() {
    return (
      <div
        className="w-20 sm:w-36 md:relative md:w-44"
        ref={(node) => (this.dropDownNode = node!)}
      >
        <div
          onClick={this.toggle}
          onKeyPress={this.toggle}
          className="flex cursor-pointer items-center justify-between rounded bg-white px-2 py-2 text-xs leading-tight text-gray-1100 shadow hover:bg-gray-200 dark:bg-gray-500 dark:hover:bg-gray-700 md:px-3 md:text-sm"
          tabIndex={0}
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
          aria-controls="datemenu"
        >
          <span className="mr-1 truncate md:mr-2">
            {this.props.leadingText}
            <span className="font-medium">{this.timeFrameText()}</span>
          </span>
          <IconChevronDown className="hidden h-4 w-4 text-gray-900 sm:inline-block md:h-5 md:w-5" />
        </div>

        <Transition
          show={this.state.open}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {this.renderDropDownContent()}
        </Transition>
      </div>
    );
  }

  // TODO: Enable date picker
  render() {
    return null;
    // return (
    //   <div className="flex ml-auto pl-2">
    //     <DatePickerArrows site={this.props.site} query={this.props.query} />
    //     {this.renderPicker()}
    //   </div>
    // );
  }
}

export default DatePicker;

function ListSeparatator({
  className,
  ...restProps
}: React.ComponentProps<'div'>): JSX.Element {
  return (
    <div
      {...restProps}
      className={clsx(
        'border-t border-gray-200 dark:border-gray-900',
        className,
      )}
    />
  );
}
