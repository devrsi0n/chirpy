import { getAdminApollo } from '$/server/common/admin-apollo';
import {
  AllProjectsDocument,
  AllProjectsQuery,
  ProjectByPkDocument,
} from '$/server/graphql/generated/project';

export async function getProjectById(id: string) {
  const adminApollo = getAdminApollo();
  try {
    const { data } = await adminApollo.query({
      query: ProjectByPkDocument,
      variables: {
        id,
      },
    });
    return data?.projectByPk;
  } catch (error) {
    console.warn(`query project by id error: ${error}`);
    return null;
  }
}

export type AllProjectStaticPathParams = { params: { domain: string } }[];

export async function getAllProjectStaticPathsByDomain(): Promise<AllProjectStaticPathParams> {
  const adminApollo = getAdminApollo();
  const {
    data: { projects },
  } = await adminApollo.query<AllProjectsQuery>({
    query: AllProjectsDocument,
  });

  return projects.map(({ domain }) => {
    return {
      params: {
        domain,
      },
    };
  });
}
