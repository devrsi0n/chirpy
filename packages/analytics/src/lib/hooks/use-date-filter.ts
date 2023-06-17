import { DateRangePickerValue } from '@tremor/react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { DateFilter, dateFormat } from '../types/date-filter';

export default function useDateFilter() {
  const router = useRouter();
  const [dateRangePickerValue, setDateRangePickerValue] =
    useState<DateRangePickerValue>();

  const setDateFilter = useCallback(
    ([startDate, endDate, value]: DateRangePickerValue) => {
      const lastDays = value ?? DateFilter.Custom;

      const url = new URL(window.location.href);
      const { searchParams } = url;
      searchParams.set('last_days', lastDays);

      if (lastDays === DateFilter.Custom && startDate && endDate) {
        searchParams.set('start_date', moment(startDate).format(dateFormat));
        searchParams.set('end_date', moment(endDate).format(dateFormat));
      } else {
        searchParams.delete('start_date');
        searchParams.delete('end_date');
      }
      router.push(url.href, undefined, { scroll: false });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const lastDaysParam = router.query.last_days as DateFilter;
  const lastDays: DateFilter =
    typeof lastDaysParam === 'string' &&
    Object.values(DateFilter).includes(lastDaysParam)
      ? lastDaysParam
      : DateFilter.Last7Days;

  const { startDate, endDate } = useMemo(() => {
    const today = moment().utc();
    if (lastDays === DateFilter.Custom) {
      const startDateParam = router.query.start_date as string;
      const endDateParam = router.query.end_date as string;

      const startDate =
        startDateParam ||
        moment(today)
          .subtract(+DateFilter.Last7Days, 'days')
          .format(dateFormat);
      const endDate = endDateParam || moment(today).format(dateFormat);

      return { startDate, endDate };
    }

    const startDate = moment(today)
      .subtract(+lastDays, 'days')
      .format(dateFormat);
    const endDate =
      lastDays === DateFilter.Yesterday
        ? moment(today)
            .subtract(+DateFilter.Yesterday, 'days')
            .format(dateFormat)
        : moment(today).format(dateFormat);

    return { startDate, endDate };
  }, [lastDays, router.query.start_date, router.query.end_date]);

  useEffect(() => {
    setDateRangePickerValue([
      moment(startDate).toDate(),
      moment(endDate).toDate(),
      lastDays === DateFilter.Custom ? null : lastDays,
    ]);
  }, [startDate, endDate, lastDays]);

  const onDateRangePickerValueChange = useCallback(
    ([startDate, endDate, value]: DateRangePickerValue) => {
      if (startDate && endDate) {
        setDateFilter([startDate, endDate, value]);
      } else {
        setDateRangePickerValue([startDate, endDate, value]);
      }
    },
    [setDateFilter],
  );

  return {
    startDate,
    endDate,
    dateRangePickerValue,
    onDateRangePickerValueChange,
  };
}
