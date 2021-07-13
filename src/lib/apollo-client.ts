import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
  split,
  ApolloLink,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { persistCache, PersistentStorage, LocalForageWrapper } from 'apollo3-cache-persist';
import { PersistedData } from 'apollo3-cache-persist/types';
import Cookies from 'js-cookie';
import * as localForage from 'localforage';
import preval from 'preval.macro';
import * as React from 'react';
import { usePromise } from 'react-use';

import { AUTH_COOKIE_NAME } from '$/server/common/constants';
import { isENVDev } from '$/server/utilities/env';
import { ssrMode } from '$/utilities/env';

// Used in server
const getHttpLink = () => {
  const link = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_HASURA_HTTP_ORIGIN}/v1/graphql`,
    credentials: `include`,
    headers: getHeaders(), // auth token is fetched on the server side
  });
  return link;
};

// Used in browser
const getWSLink = () => {
  return new WebSocketLink({
    uri: `${process.env.NEXT_PUBLIC_HASURA_WS_ORIGIN}/v1/graphql`,
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: () => {
        return {
          headers: getHeaders(),
        };
      },
    },
  });
};

function getHeaders() {
  return {
    authorization: `Bearer ${
      Cookies.get(AUTH_COOKIE_NAME) ||
      preval`
      process.env.HASH_KEY = ${process.env.HASH_KEY};
      module.exports = require("./anonymous-token.js");
    `
    }`,
  };
}

const createApolloClient = async () => {
  let link: ApolloLink;
  const httpLink = getHttpLink();
  if (ssrMode) {
    link = httpLink;
  } else {
    const wsLink = getWSLink();
    link = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink,
      httpLink,
    );
  }
  const cache = new InMemoryCache();
  await persistCache({
    cache,
    storage: new LocalForageWrapper(localForage) as PersistentStorage<
      PersistedData<NormalizedCacheObject>
    >,
    debug: isENVDev,
  });

  return new ApolloClient({
    link,
    cache,
    ssrMode,
  });
};

let cachedApolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export async function getApolloClient(
  initialState: $TsFixMe = null,
): Promise<ApolloClient<NormalizedCacheObject>> {
  const _apolloClient = cachedApolloClient ?? (await createApolloClient());
  cachedApolloClient = _apolloClient;

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  return _apolloClient;
}

export function useApollo(initialState?: $TsFixMe): ApolloClient<NormalizedCacheObject> | null {
  const [client, setClient] = React.useState<ApolloClient<NormalizedCacheObject> | null>(null);
  const mounted = usePromise();
  React.useEffect(() => {
    mounted(getApolloClient(initialState)).then((client) => {
      setClient(client);
    });
  });
  return client;
}
