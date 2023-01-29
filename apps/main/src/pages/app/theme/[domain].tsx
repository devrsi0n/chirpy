import { ssg } from '@chirpy-dev/trpc';
import { ProjectThemeProps } from '@chirpy-dev/ui';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';

import { getRecentProjectStaticPathsByDomain } from '$/server/services/project';

type PathParams = {
  domain: string;
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  if (process.env.DOCKER) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
  const paths = await getRecentProjectStaticPathsByDomain(50);

  return { paths, fallback: 'blocking' };
};

type StaticProps = ProjectThemeProps;

export const getStaticProps: GetStaticProps<StaticProps, PathParams> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<
  GetStaticPropsResult<StaticProps>
> => {
  if (!params?.domain) {
    return { notFound: true };
  }
  const { domain } = params;
  const project = await ssg.project.byDomain.fetch(domain);
  if (!project?.id) {
    return { notFound: true };
  }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      domain,
      buildDate: new Date().toISOString(),
    },
    revalidate: 60 * 60,
  };
};

export { ProjectThemePage as default } from '@chirpy-dev/ui';
