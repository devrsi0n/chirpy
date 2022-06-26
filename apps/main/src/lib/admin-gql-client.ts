import { createClient as createWSClient } from 'graphql-ws';
import { createClient, Client } from 'urql';
import { WebSocket } from 'ws';

import { ADMIN_HEADERS } from './constants';
import {
  getGqlClientOptions,
  IGqlClientOptions,
  SSRExchange,
} from './gql-client';

class ChirpyWebSocket extends WebSocket {
  constructor(...args: ConstructorParameters<typeof WebSocket>) {
    super(args[0], args[1], {
      ...args[2],
      headers: ADMIN_HEADERS,
    });
  }
}

export function getAdminGqlClient(): Client {
  return createClient(getAdminGqlClientOptions().clientOptions);
}

export interface IAdminGqlClientWithSsrExchange {
  client: Client;
  ssrExchange: SSRExchange;
}

export function getAdminGqlClientWithSsrExchange(): IAdminGqlClientWithSsrExchange {
  const { clientOptions, ssrExchange } = getAdminGqlClientOptions();
  return {
    client: createClient(clientOptions),
    ssrExchange,
  };
}

export function getAdminGqlClientOptions(): IGqlClientOptions {
  return getGqlClientOptions(ADMIN_HEADERS, 'network-only', {
    wsClient: createWSClient({
      url: `${process.env.NEXT_PUBLIC_HASURA_WS_ORIGIN}/v1/graphql`,
      webSocketImpl: ChirpyWebSocket,
    }),
  });
}
