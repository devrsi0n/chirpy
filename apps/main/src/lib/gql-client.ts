import { devtoolsExchange } from '@urql/devtools';
import { offlineExchange } from '@urql/exchange-graphcache';
import { makeDefaultStorage } from '@urql/exchange-graphcache/default-storage';
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
  cacheExchange,
} from 'urql';

import { isENVDev } from '$/server/utilities/env';
import { ssrMode } from '$/utilities/env';

import { GRAPHQL_CACHE_DB_NAME } from './constants';

const getOfflineExchange = () => {
  const storage = makeDefaultStorage({
    idbName: GRAPHQL_CACHE_DB_NAME, // The name of the IndexedDB database
    maxAge: 7, // The maximum age of the persisted data in days
  });
  return offlineExchange({
    storage,
  });
};

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
    ssrMode ? cacheExchange : getOfflineExchange(),
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: (operation) => ({
        subscribe: (sink) => {
          const _wsClient =
            wsClient ||
            createWSClient({
              url: `${process.env.NEXT_PUBLIC_HASURA_WS_ORIGIN}/v1/graphql`,
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
    exchanges.unshift(devtoolsExchange);
  }
  return {
    url: `${process.env.NEXT_PUBLIC_HASURA_HTTP_ORIGIN}/v1/graphql`,
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
