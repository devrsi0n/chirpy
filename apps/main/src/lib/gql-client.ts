import { devtoolsExchange } from '@urql/devtools';
import { createClient as createWSClient, Client as WsClient } from 'graphql-ws';
import {
  createClient,
  Client,
  defaultExchanges,
  subscriptionExchange,
  ClientOptions,
  RequestPolicy,
  Exchange,
} from 'urql';

import { isENVDev } from '@chirpy/utilities';

// export function withGqlClient(
//   getClientConfig?: NextUrqlClientConfig,
//   options?: WithUrqlClientOptions | undefined,
// ) {

//   return withUrqlClient(
//     (ssrExchange: SSRExchange, ctx?: NextPageContext) => ({
//       ...getGqlClientOptions(getHeaders()),
//       ...getClientConfig?.(ssrExchange, ctx),
//     }),
//     { ssr: false, ...options },
//   );
// }

export function createGqlClient(hasuraToken = ''): Client {
  return createClient(getGqlClientOptions(getHeaders(hasuraToken)));
}

export function getGqlClientOptions(
  headers: Record<string, string>,
  requestPolicy: RequestPolicy = 'cache-and-network',
  wsClient?: WsClient,
): ClientOptions {
  const exchanges: Exchange[] = [
    ...defaultExchanges,
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
