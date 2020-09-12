import * as React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCache,
  NormalizedCacheObject,
} from '@apollo/client';

let apolloClient:
  | ApolloClient<NormalizedCache>
  | ApolloClient<NormalizedCacheObject>
  | undefined;

const link = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/graphql`,
  credentials: `same-origin`,
});

const createApolloClient = () =>
  new ApolloClient({
    link,
    cache: new InMemoryCache(),
    ssrMode: !process.browser,
  });

function initializeApollo(
  initialState: $TsFixMe = null,
): ApolloClient<NormalizedCache> | ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(
  initialState?: $TsFixMe,
): ReturnType<typeof initializeApollo> {
  const store = React.useMemo(() => initializeApollo(initialState), [
    initialState,
  ]);
  return store;
}
