import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export { dayjs };

export function getStartOfSubtractDate(value: number, unit: dayjs.OpUnitType = 'day'): string {
  return dayjs().startOf('day').subtract(value, unit).toISOString();
}
