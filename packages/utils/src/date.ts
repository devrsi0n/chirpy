import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

// eslint-disable-next-line unicorn/prefer-export-from
export const cpDayjs = dayjs;
