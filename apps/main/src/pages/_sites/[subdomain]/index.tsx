import { prisma } from '@chirpy-dev/trpc';
import { SitesIndexProps } from '@chirpy-dev/ui';
import { GetStaticPaths, GetStaticProps } from 'next';

export { SitesIndex as default } from '@chirpy-dev/ui';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<SitesIndexProps> = async ({
  params,
}) => {
  if (typeof params?.subdomain !== 'string') {
    return { notFound: true };
  }
  const site = await prisma.site.findUnique({
    where: {
      subdomain: params?.subdomain,
    },
  });
  if (!site?.id) {
    return { notFound: true };
  }
  return {
    props: {
      subdomain: site.subdomain,
    },
    revalidate: 3600,
  };
};
