import { getAdminApollo } from '$server/common/admin-apollo';
import {
  InsertOneSessionDocument,
  InsertOneSessionMutation,
  InsertOneSessionMutationVariables,
  SessionByPkDocument,
  SessionByPkQuery,
} from '$server/graphql/generated/session';

export async function createSession({
  id,
  projectId,
  hostname,
  language,
  os,
  screen,
  device,
  country,
  browser,
}: InsertOneSessionMutationVariables): Promise<InsertOneSessionMutation['insertOneSession']> {
  const adminApollo = getAdminApollo();
  const { data } = await adminApollo.mutate({
    mutation: InsertOneSessionDocument,
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
  return data?.insertOneSession;
}

export async function getSessionById(id: string): Promise<SessionByPkQuery['sessionByPk'] | null> {
  const adminApollo = getAdminApollo();
  try {
    const { data } = await adminApollo.query({
      query: SessionByPkDocument,
      variables: { id },
    });
    return data?.sessionByPk;
  } catch (error) {
    console.warn(`session doesn't exist: ${error}`);
    return null;
  }
}
