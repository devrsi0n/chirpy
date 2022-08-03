import { AllProjectsDocument } from '$/server/graphql/generated/project';

import { query } from '../common/gql';

export type AllProjectStaticPathParams = { params: { domain: string } }[];

export async function getAllProjectStaticPathsByDomain(): Promise<AllProjectStaticPathParams> {
  const projects = await query(AllProjectsDocument, {}, 'projects');

  return (
    projects.map(({ domain }) => {
      return {
        params: {
          domain,
        },
      };
    }) || []
  );
}
