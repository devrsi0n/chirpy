export enum DateFilter {
  Today = '0',
  Yesterday = '1',
  Last7Days = '7',
  Last30Days = '30',
  Last12Months = '365',
  Custom = 'custom',
}

export type DateRangePickerOption = {
  value: string;
  text: string;
  startDate: Date;
};

export const dateFormat = 'YYYY-MM-DD';
