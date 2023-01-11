import { prisma } from '@chirpy-dev/trpc';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';

export type SiteStaticProps = {
  id: string;
};

export const getSiteStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

/**
 * Just make sure the site id is valid or redirect to 404
 */
export const getSiteStaticProps: GetStaticProps<SiteStaticProps> = async ({
  params,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<SiteStaticProps>> => {
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
      id: data.id,
    },
  };
};
