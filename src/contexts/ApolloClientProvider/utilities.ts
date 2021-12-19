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
import { persistCache, LocalForageWrapper } from 'apollo3-cache-persist';
import * as localForage from 'localforage';

import { isENVDev } from '$/server/utilities/env';
import { ssrMode } from '$/utilities/env';

export function iniApolloClient(
  hasuraToken = '',
  initialState: any = null,
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = createApolloClient(hasuraToken);

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

let cache: InMemoryCache;

const createApolloClient = (hasuraToken: string) => {
  let link: ApolloLink;
  const httpLink = getHttpLink(hasuraToken);
  if (ssrMode) {
    link = httpLink;
  } else {
    const wsLink = getWSLink(hasuraToken);
    link = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink,
      httpLink,
    );
  }
  if (!cache) {
    cache = new InMemoryCache();
    if (!ssrMode) {
      persistCache({
        cache,
        storage: new LocalForageWrapper(localForage) as any,
        debug: isENVDev,
      });
    }
  }

  return new ApolloClient({
    link,
    cache,
    ssrMode,
  });
};

const getHttpLink = (hasuraToken: string) => {
  const link = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_HASURA_HTTP_ORIGIN}/v1/graphql`,
    credentials: `include`,
    headers: getHeaders(hasuraToken),
  });
  return link;
};

const getWSLink = (hasuraToken: string) => {
  return new WebSocketLink({
    uri: `${process.env.NEXT_PUBLIC_HASURA_WS_ORIGIN}/v1/graphql`,
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: () => {
        return {
          headers: getHeaders(hasuraToken),
        };
      },
    },
  });
};

function getHeaders(hasuraToken: string) {
  return {
    authorization: `Bearer ${hasuraToken || 'anonymous'}`,
  };
}
