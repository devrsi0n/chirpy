import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

dayjs.extend(relativeTime);

// eslint-disable-next-line unicorn/prefer-export-from
export const cpDayjs = dayjs;
