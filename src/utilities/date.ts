import dayjs from 'dayjs';

export function getStartOfSubtractDate(value: number, unit: dayjs.OpUnitType = 'day'): string {
  return dayjs().startOf('day').subtract(value, unit).toISOString();
}
