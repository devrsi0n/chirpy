import { Site } from './type';

// https://stackoverflow.com/a/50130338
export function formatISO(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
    .toISOString()
    .split('T')[0];
}

export function shiftMonths(date: Date, months: number) {
  const newDate = new Date(date.getTime());
  const d = newDate.getDate();
  newDate.setMonth(newDate.getMonth() + +months);
  if (newDate.getDate() != d) {
    newDate.setDate(0);
  }
  return newDate;
}

export function shiftDays(date: Date, days: number) {
  const newDate = new Date(date.getTime());
  newDate.setDate(newDate.getDate() + days);
  return newDate;
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
];

export function formatMonthYYYY(date: Date) {
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatMonth(date: Date) {
  return `${MONTHS[date.getMonth()]}`;
}

export function formatDay(date: Date) {
  return `${date.getDate()} ${formatMonth(date)}`;
}

export function formatDayShort(date: Date) {
  return `${date.getDate()} ${formatMonth(date).slice(0, 3)}`;
}

export function parseUTCDate(dateString: string) {
  const date = new Date(dateString);
  return new Date(date.getTime() + date.getTimezoneOffset() * 60_000);
}

// https://stackoverflow.com/a/11124448
export function nowForSite(site: Site) {
  const browserOffset = new Date().getTimezoneOffset() * 60;
  return new Date(Date.now() + +site.offset * 1000 + browserOffset * 1000);
}

export function lastMonth(site: Site) {
  return shiftMonths(nowForSite(site), -1);
}

export function isSameMonth(date1: Date, date2: Date) {
  return formatMonthYYYY(date1) === formatMonthYYYY(date2);
}

export function isToday(site: Site, date: Date) {
  return formatISO(date) === formatISO(nowForSite(site));
}

export function isThisMonth(site: Site, date: Date) {
  return formatMonthYYYY(date) === formatMonthYYYY(nowForSite(site));
}

export function isBefore(date1: Date, date2: Date, period: string) {
  /* assumes 'day' and 'month' are the only valid periods */
  if (date1.getFullYear() !== date2.getFullYear()) {
    return date1.getFullYear() < date2.getFullYear();
  }
  if (date1.getMonth() !== date2.getMonth()) {
    return date1.getMonth() < date2.getMonth();
  }
  if (period === 'month') {
    return false;
  }
  return date1.getDate() < date2.getDate();
}

export function isAfter(date1: Date, date2: Date, period: string) {
  /* assumes 'day' and 'month' are the only valid periods */
  if (date1.getFullYear() !== date2.getFullYear()) {
    return date1.getFullYear() > date2.getFullYear();
  }
  if (date1.getMonth() !== date2.getMonth()) {
    return date1.getMonth() > date2.getMonth();
  }
  if (period === 'month') {
    return false;
  }
  return date1.getDate() > date2.getDate();
}
