import { Popover } from '@headlessui/react';
import { DateRangePicker, DateRangePickerItem } from '@tremor/react';
import moment from 'moment';

import useDateFilter from '../lib/hooks/use-date-filter';
import { DateFilter as DateFilterType } from '../lib/types/date-filter';
import { QuestionIcon } from './Icons';

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

        <Popover.Panel className="absolute -right-10 bottom-6 z-[2] w-24 rounded bg-gray-0 px-2 py-1 text-xs font-light text-gray-900 shadow-sm">
          UTC timezone
        </Popover.Panel>
      </Popover>

      <div className="min-w-[165px]">
        <DateRangePicker
          value={dateRangePickerValue}
          onValueChange={onDateRangePickerValueChange}
          enableSelect
        >
          <DateRangePickerItem value={DateFilterType.Today} from={new Date()}>
            Today
          </DateRangePickerItem>
          <DateRangePickerItem
            value={DateFilterType.Last7Days}
            from={moment().subtract(7, 'days').toDate()}
          >
            Last 7 days
          </DateRangePickerItem>
          <DateRangePickerItem
            value={DateFilterType.Last30Days}
            from={moment().subtract(30, 'days').toDate()}
          >
            Last 30 days
          </DateRangePickerItem>
          <DateRangePickerItem
            value={DateFilterType.Last12Months}
            from={moment().subtract(12, 'months').toDate()}
          >
            Last 12 months
          </DateRangePickerItem>
        </DateRangePicker>
      </div>
    </div>
  );
}
