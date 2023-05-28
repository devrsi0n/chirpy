import { Popover } from '@headlessui/react';
import { DateRangePicker } from '@tremor/react';
import moment from 'moment';

import useDateFilter from '../lib/hooks/use-date-filter';
import {
  DateFilter as DateFilterType,
  DateRangePickerOption,
} from '../lib/types/date-filter';
import { QuestionIcon } from './Icons';

const dateFilterOptions: DateRangePickerOption[] = [
  { text: 'Today', value: DateFilterType.Today, startDate: new Date() },
  {
    text: 'Yesterday',
    value: DateFilterType.Yesterday,
    startDate: moment().subtract(1, 'days').toDate(),
  },
  {
    text: '7 days',
    value: DateFilterType.Last7Days,
    startDate: moment().subtract(7, 'days').toDate(),
  },
  {
    text: '30 days',
    value: DateFilterType.Last30Days,
    startDate: moment().subtract(30, 'days').toDate(),
  },
  {
    text: '12 months',
    value: DateFilterType.Last12Months,
    startDate: moment().subtract(12, 'months').toDate(),
  },
];

export default function DateFilter() {
  const { dateRangePickerValue, onDateRangePickerValueChange } =
    useDateFilter();

  return (
    <div className="flex items-center gap-4">
      <Popover className="relative h-4">
        <Popover.Button>
          <QuestionIcon className="text-secondaryLight" />
          <div className="sr-only">What is the time zone used?</div>
        </Popover.Button>

        <Popover.Panel className="bg-secondary absolute bottom-6 -right-10 z-[2] w-24 rounded py-1 px-2 text-xs font-light text-white">
          UTC timezone
        </Popover.Panel>
      </Popover>

      <div className="min-w-[165px]">
        <DateRangePicker
          value={dateRangePickerValue}
          onValueChange={onDateRangePickerValueChange}
          options={dateFilterOptions}
          enableYearPagination
        />
      </div>
    </div>
  );
}
