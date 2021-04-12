import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCache,
  NormalizedCacheObject,
  split,
  ApolloLink,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import Cookies from 'js-cookie';
import { NextApiRequest } from 'next';
import preval from 'preval.macro';
import * as React from 'react';

import { AUTH_COOKIE_NAME } from '../../shared/constants';

let cachedApolloClient:
  | ApolloClient<NormalizedCache>
  | ApolloClient<NormalizedCacheObject>
  | null = null;

// Used in server
const getHttpLink = (headers: Record<string, string> | null) => {
  const link = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_HASURA_HTTP_ORIGIN}/v1/graphql`,
    credentials: `include`,
    headers, // auth token is fetched on the server side
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
          headers: {
            authorization: `Bearer ${
              Cookies.get(AUTH_COOKIE_NAME) ||
              preval`
              const token = require("./anonymous-token.js");
              module.exports = token;
            `
            }`,
          },
        };
      },
    },
  });
};

const ssrMode = typeof window === 'undefined';

function getHeaders(req?: NextApiRequest) {
  if (ssrMode) return null;
  if (!req) return null;

  const cookie = req.cookies[AUTH_COOKIE_NAME];
  if (!cookie) return null;

  return {
    authorization: `Bearer ${cookie || ''}`,
  };
}

const createApolloClient = (req?: NextApiRequest) => {
  let link: ApolloLink;
  const httpLink = getHttpLink(getHeaders(req));
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

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    ssrMode,
  });
};

export function getApolloClient(
  initialState: $TsFixMe = null,
  req?: NextApiRequest,
): ApolloClient<NormalizedCache> | ApolloClient<NormalizedCacheObject> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (ssrMode) {
    return createApolloClient(req);
  }

  const _apolloClient = cachedApolloClient ?? createApolloClient(req);
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

export function useApollo(initialState?: $TsFixMe): ReturnType<typeof getApolloClient> {
  const store = React.useMemo(() => getApolloClient(initialState), [initialState]);
  return store;
}
