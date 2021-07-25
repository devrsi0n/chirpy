import { getAdminApollo } from '$/server/common/admin-apollo';
import {
  InsertOneAnonymousSessionDocument,
  InsertOneAnonymousSessionMutation,
  InsertOneAnonymousSessionMutationVariables,
  AnonymousSessionByPkDocument,
  AnonymousSessionByPkQuery,
} from '$/server/graphql/generated/session';

export async function createAnonymousSession({
  id,
  projectId,
  hostname,
  language,
  os,
  screen,
  device,
  country,
  browser,
}: InsertOneAnonymousSessionMutationVariables): Promise<
  InsertOneAnonymousSessionMutation['insertOneAnonymousSession']
> {
  const adminApollo = getAdminApollo();
  const { data } = await adminApollo.mutate({
    mutation: InsertOneAnonymousSessionDocument,
    variables: {
      id,
      projectId,
      hostname,
      language,
      os,
      screen,
      device,
      country,
      browser,
    },
  });
  return data?.insertOneAnonymousSession;
}

export async function getAnonymousSessionById(
  id: string,
): Promise<AnonymousSessionByPkQuery['anonymousSessionByPk'] | null> {
  const adminApollo = getAdminApollo();
  try {
    const { data } = await adminApollo.query({
      query: AnonymousSessionByPkDocument,
      variables: { id },
    });
    return data?.anonymousSessionByPk;
  } catch (error) {
    console.warn(`AnonymousSession doesn't exist: ${error}`);
    return null;
  }
}
