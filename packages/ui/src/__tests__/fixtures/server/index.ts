import { setupServer } from 'msw/node';

import { restHandlers } from './rest-handlers';

const handlers = [...restHandlers];
export const server = setupServer(...handlers);
