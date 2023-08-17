import { prisma, ssg } from '@chirpy-dev/trpc';
import { DashboardProps } from '@chirpy-dev/ui';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';

export { DashboardHome as default } from '@chirpy-dev/ui';

type PathParams = {
  username: string;
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const projects = await prisma.project.findMany({
    select: {
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
    take: 20,
  });
  return {
    paths: projects
      .map((p) => p.user?.username)
      .filter(Boolean)
      .map((username) => ({
        params: {
          username: username as string,
        },
      })),
    fallback: 'blocking',
  };
};

type StaticProps = DashboardProps;

export const getStaticProps: GetStaticProps<StaticProps, PathParams> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<
  GetStaticPropsResult<StaticProps>
> => {
  if (!params?.username) {
    return { notFound: true };
  }
  const { username } = params;
  const projects = await ssg.project.all.fetch({
    username,
  });

  return {
    props: {
      projects,
    },
    revalidate: 60,
  };
};
