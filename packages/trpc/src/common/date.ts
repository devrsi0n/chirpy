import { cpDayjs } from '@chirpy-dev/utils';
import utc from 'dayjs/plugin/utc';

cpDayjs.extend(utc);

export { cpDayjs as trpcDayjs } from '@chirpy-dev/utils';
