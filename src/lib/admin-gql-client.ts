import { createClient as createWSClient, Client as WsClient } from 'graphql-ws';
import { ClientRequestArgs } from 'http';
import { createClient, Client } from 'urql';
import { WebSocket, ClientOptions } from 'ws';

import { getGqlClientOptions } from './gql-client';

class ChirpyWebSocket extends WebSocket {
  constructor(...args: ConstructorParameters<typeof WebSocket>) {
    super(args[0], args[1], {
      ...args[2],
      headers: ADMIN_HEADERS,
    });
  }
}

export function getAdminGqlClient(): Client {
  return createClient(
    getGqlClientOptions(
      ADMIN_HEADERS,
      'network-only',
      createWSClient({
        url: `${process.env.NEXT_PUBLIC_HASURA_WS_ORIGIN}/v1/graphql`,
        webSocketImpl: ChirpyWebSocket,
      }),
    ),
  );
}

const ADMIN_HEADERS = {
  'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
};
