import { prisma } from '@chirpy-dev/trpc';

export type AllProjectStaticPathParams = {
  params: { domain: string; username: string };
}[];

export async function getRecentProjectStaticPathsByDomain(
  take = 50,
): Promise<AllProjectStaticPathParams> {
  const projects = await prisma.project.findMany({
    select: {
      domain: true,
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
    take,
  });
  return (
    projects.map(({ domain, user }) => {
      return {
        params: {
          username: user?.username || '',
          domain,
        },
      };
    }) || []
  );
}
