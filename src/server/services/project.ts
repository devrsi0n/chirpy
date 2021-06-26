import { getAdminApollo } from '$/server/common/admin-apollo';
import { ProjectByPkDocument } from '$/server/graphql/generated/project';

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
