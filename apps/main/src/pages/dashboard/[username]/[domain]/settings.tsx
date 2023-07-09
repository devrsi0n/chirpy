import { ssg } from '@chirpy-dev/trpc';
import { ProjectSettingsProps } from '@chirpy-dev/ui';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';

import { getRecentProjectStaticPathsByDomain } from '$/server/services/project';

export { ProjectSettings as default } from '@chirpy-dev/ui';

type PathParams = {
  domain: string;
  username: string;
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const paths = await getRecentProjectStaticPathsByDomain(50);
  return { paths, fallback: 'blocking' };
};

type StaticProps = ProjectSettingsProps;

export const getStaticProps: GetStaticProps<StaticProps, PathParams> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<
  GetStaticPropsResult<StaticProps>
> => {
  if (!params?.domain || !params.username) {
    return { notFound: true };
  }
  const { domain } = params;
  const project = await ssg.project.byDomain.fetch(domain);
  if (!project?.id) {
    return { notFound: true };
  }
  return {
    props: {
      project,
      username: params.username,
    },
    revalidate: 60,
  };
};
