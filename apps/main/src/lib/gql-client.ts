import { devtoolsExchange } from '@urql/devtools';
import { createClient as createWSClient, Client as WsClient } from 'graphql-ws';
import {
  createClient,
  Client,
  subscriptionExchange,
  ClientOptions,
  RequestPolicy,
  Exchange,
  dedupExchange,
  fetchExchange,
} from 'urql';

import { isENVDev } from '$/server/utilities/env';

export function createGqlClient(hasuraToken = ''): Client {
  return createClient(getGqlClientOptions(getHeaders(hasuraToken)));
}

export function getGqlClientOptions(
  headers: Record<string, string>,
  requestPolicy: RequestPolicy = 'cache-and-network',
  wsClient?: WsClient,
): ClientOptions {
  const exchanges: Exchange[] = [
    dedupExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: (operation) => ({
        subscribe: (sink) => {
          const _wsClient =
            wsClient ||
            createWSClient({
              url: process.env.NEXT_PUBLIC_HASURA_WS_ORIGIN,
              connectionParams: () => {
                return {
                  headers,
                };
              },
            });
          return {
            unsubscribe: _wsClient.subscribe(operation, sink),
          };
        },
      }),
    }),
  ];
  if (isENVDev) {
    exchanges.unshift(devtoolsExchange as any);
  }
  return {
    url: process.env.NEXT_PUBLIC_HASURA_HTTP_ORIGIN,
    exchanges,
    fetchOptions: {
      headers,
    },
    requestPolicy,
  };
}

function getHeaders(hasuraToken: string) {
  return {
    authorization: `Bearer ${hasuraToken}`,
  };
}
