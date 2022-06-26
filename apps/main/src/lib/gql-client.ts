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
  ssrExchange,
} from 'urql';

import { isENVDev } from '$/server/utilities/env';
import { isSSRMode } from '$/utilities/env';

import { GRAPHQL_CACHE_DB_NAME } from './constants';

export type SSRExchange = ReturnType<typeof ssrExchange>;
export type SSRData = ReturnType<ReturnType<typeof ssrExchange>['extractData']>;

const getOfflineExchange = () => {
  const storage = makeDefaultStorage({
    idbName: GRAPHQL_CACHE_DB_NAME, // The name of the IndexedDB database
    maxAge: 7, // The maximum age of the persisted data in days
  });
  return offlineExchange({
    storage,
  });
};

export function createGqlClient(
  hasuraToken = '',
  ssrInitState?: SSRData,
): Client {
  return createClient(
    getGqlClientOptions(getGqlClientHeaders(hasuraToken), undefined, {
      ssrInitState,
    }).clientOptions,
  );
}

export interface IGqlClientOptions {
  clientOptions: ClientOptions;
  ssrExchange: SSRExchange;
}

export function getGqlClientOptions(
  headers: Record<string, string>,
  requestPolicy: RequestPolicy = 'cache-and-network',
  {
    ssrInitState,
    wsClient,
  }: { ssrInitState?: SSRData; wsClient?: WsClient } = {},
): IGqlClientOptions {
  const _ssrExchange = ssrExchange({
    isClient: !isSSRMode,
    initialState: ssrInitState,
    staleWhileRevalidate: true,
  });
  const exchanges: Exchange[] = [
    dedupExchange,
    isSSRMode ? cacheExchange : getOfflineExchange(),
    _ssrExchange,
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
    clientOptions: {
      url: `${process.env.NEXT_PUBLIC_HASURA_HTTP_ORIGIN}/v1/graphql`,
      exchanges,
      fetchOptions: {
        headers,
      },
      requestPolicy,
    },
    ssrExchange: _ssrExchange,
  };
}

export function getGqlClientHeaders(hasuraToken: string) {
  return {
    authorization: `Bearer ${hasuraToken}`,
  };
}
