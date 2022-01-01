import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import ws from 'ws';

const HEADERS = {
  'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
};

function getHttpLink() {
  const link = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_HASURA_HTTP_ORIGIN}/v1/graphql`,
    // credentials: `include`,
    headers: HEADERS,
  });
  return link;
}

const getWSLink = () => {
  return new WebSocketLink({
    uri: `${process.env.NEXT_PUBLIC_HASURA_WS_ORIGIN}/v1/graphql`,
    webSocketImpl: ws,
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: () => {
        return {
          headers: HEADERS,
        };
      },
    },
  });
};

/**
 * Only used by service, never use it in client.
 */
export function getAdminApollo(): ApolloClient<NormalizedCacheObject> {
  if (global.adminApollo) {
    return global.adminApollo;
  }
  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    getWSLink(),
    getHttpLink(),
  );

  global.adminApollo = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    ssrMode: true,
    defaultOptions: {
      query: {
        // Only rely on network as there are some race conditions with serverless functions
        fetchPolicy: 'network-only',
      },
    },
  });
  return global.adminApollo;
}
