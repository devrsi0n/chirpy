import { getAdminGqlClient } from '$/lib/admin-gql-client';
import {
  AllProjectsDocument,
  AllProjectsQuery,
  ProjectByPkDocument,
} from '$/server/graphql/generated/project';

export async function getProjectById(id: string) {
  const adminApollo = getAdminGqlClient();
  try {
    const { data } = await adminApollo
      .query(ProjectByPkDocument, {
        id,
      })
      .toPromise();
    return data?.projectByPk;
  } catch (error) {
    console.warn(`query project by id error: ${error}`);
    return null;
  }
}

export type AllProjectStaticPathParams = { params: { domain: string } }[];

export async function getAllProjectStaticPathsByDomain(): Promise<AllProjectStaticPathParams> {
  const client = getAdminGqlClient();
  const { data } = await client.query<AllProjectsQuery>(AllProjectsDocument).toPromise();

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
