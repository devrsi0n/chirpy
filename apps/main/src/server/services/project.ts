import { prisma } from '@chirpy-dev/trpc';

export type AllProjectStaticPathParams = { params: { domain: string } }[];

export async function getRecentProjectStaticPathsByDomain(
  take: number,
): Promise<AllProjectStaticPathParams> {
  const projects = await prisma.project.findMany({
    select: {
      domain: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take,
  });
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
