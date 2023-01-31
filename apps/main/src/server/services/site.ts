import { prisma } from '@chirpy-dev/trpc';
import { SiteHomeProps } from '@chirpy-dev/ui';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';

export const getSiteStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

/**
 * Just make sure the site exists or redirect to 404
 */
export const getSiteStaticProps: GetStaticProps<SiteHomeProps> = async ({
  params,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<SiteHomeProps>> => {
  if (typeof params?.subdomain !== 'string') {
    return {
      notFound: true,
      revalidate: 10,
    };
  }
  const data = await prisma.blogSite.findUnique({
    where: {
      subdomain: params.subdomain,
    },
    select: {
      id: true,
    },
  });
  if (!data?.id) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }
  return {
    props: {
      subdomain: params.subdomain,
    },
  };
};
