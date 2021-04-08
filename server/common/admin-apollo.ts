import { ApolloClient, InMemoryCache, createHttpLink, NormalizedCacheObject } from '@apollo/client';

function getHttpLink() {
  const link = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_HASURA_HTTP_ORIGIN}/v1/graphql`,
    // credentials: `include`,
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
    },
  });
  return link;
}

/**
 * Only user by internal service, never use it in client.
 */
export function getAdminApollo(): ApolloClient<NormalizedCacheObject> {
  const link = getHttpLink();
  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    ssrMode: true,
  });
}
