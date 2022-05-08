import { getAdminGqlClient } from '$/lib/admin-gql-client';
import { AllProjectsDocument, AllProjectsQuery } from '$/server/graphql/generated/project';

export type AllProjectStaticPathParams = { params: { domain: string } }[];

export async function getAllProjectStaticPathsByDomain(): Promise<AllProjectStaticPathParams> {
  const client = getAdminGqlClient();
  const { data, error } = await client.query<AllProjectsQuery>(AllProjectsDocument).toPromise();
  if (error) {
    throw new Error(`Can't query all projects, error: ${error}`);
  }

  return (
    data?.projects.map(({ domain }) => {
      return {
        params: {
          domain,
        },
      };
    }) || []
  );
}
