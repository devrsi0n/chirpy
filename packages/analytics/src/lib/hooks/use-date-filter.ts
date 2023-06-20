import { cpDayjs } from '@chirpy-dev/utils';
import { DateRangePickerValue } from '@tremor/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { DateFilter, dateFormat } from '../types/date-filter';

export default function useDateFilter() {
  const router = useRouter();
  const [dateRangePickerValue, setDateRangePickerValue] =
    useState<DateRangePickerValue>();

  const setDateFilter = useCallback(
    ({ from, to, selectValue }: DateRangePickerValue) => {
      const lastDays = selectValue ?? DateFilter.Custom;

      const url = new URL(window.location.href);
      const { searchParams } = url;
      searchParams.set('last_days', lastDays);

      if (lastDays === DateFilter.Custom && from && to) {
        searchParams.set('start_date', cpDayjs(from).format(dateFormat));
        searchParams.set('end_date', cpDayjs(to).format(dateFormat));
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
    const today = cpDayjs().utc();
    if (lastDays === DateFilter.Custom) {
      const startDateParam = router.query.start_date as string;
      const endDateParam = router.query.end_date as string;

      const startDate =
        startDateParam ||
        cpDayjs(today)
          .subtract(+DateFilter.Last7Days, 'days')
          .format(dateFormat);
      const endDate = endDateParam || cpDayjs(today).format(dateFormat);

      return { startDate, endDate };
    }

    const startDate = cpDayjs(today)
      .subtract(+lastDays, 'days')
      .format(dateFormat);
    const endDate =
      lastDays === DateFilter.Yesterday
        ? cpDayjs(today)
            .subtract(+DateFilter.Yesterday, 'days')
            .format(dateFormat)
        : cpDayjs(today).format(dateFormat);

    return { startDate, endDate };
  }, [lastDays, router.query.start_date, router.query.end_date]);

  useEffect(() => {
    setDateRangePickerValue({
      from: cpDayjs(startDate).toDate(),
      to: cpDayjs(endDate).toDate(),
      selectValue: lastDays === DateFilter.Custom ? undefined : lastDays,
    });
  }, [startDate, endDate, lastDays]);

  const onDateRangePickerValueChange = useCallback(
    ({ from, to, selectValue }: DateRangePickerValue) => {
      if (from && to) {
        setDateFilter({ from, to, selectValue });
      } else {
        setDateRangePickerValue({ from, to, selectValue });
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
