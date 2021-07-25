import { setupServer } from 'msw/node';

import { graphqlHandlers } from './graphql-handlers';
import { restHandlers } from './rest-handlers';

const handlers = [...restHandlers, ...graphqlHandlers];
export const server = setupServer(...handlers);
