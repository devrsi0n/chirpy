import { createClient as createWSClient } from 'graphql-ws';
import { createClient, Client } from 'urql';
import { WebSocket } from 'ws';

import { getPublicEnvVar } from 'utils';

import { getGqlClientOptions } from '@chirpy-dev/ui';

// Server WS client
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
        url: getPublicEnvVar(
          'NEXT_PUBLIC_HASURA_WS_ORIGIN',
          process.env.NEXT_PUBLIC_HASURA_WS_ORIGIN,
        ),
        webSocketImpl: ChirpyWebSocket,
      }),
    ),
  );
}

const ADMIN_HEADERS = {
  'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
};
