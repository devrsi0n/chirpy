import { getRecordMapByUrl, prisma } from '@chirpy-dev/trpc';
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
    select: {
      id: true,
      templateUrl: true,
      subdomain: true,
      recordMap: true,
    },
  });
  if (!site?.id) {
    return { notFound: true };
  }
  const recordMap = await getRecordMapByUrl(site?.templateUrl);
  await prisma.site.update({
    where: {
      id: site.id,
    },
    data: {
      recordMap: recordMap as $TsAny,
    },
  });
  return {
    props: {
      ...site,
      recordMap,
    },
    revalidate: 3600,
  };
};
