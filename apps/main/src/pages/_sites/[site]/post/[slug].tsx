import { getPageRecordMap, prisma } from '@chirpy-dev/trpc';
import { SitesPostProps } from '@chirpy-dev/ui';
import { GetStaticPaths, GetStaticProps } from 'next';

export { BlogPost as default } from '@chirpy-dev/ui';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<SitesPostProps> = async ({
  params,
}) => {
  if (typeof params?.slug !== 'string' || typeof params?.site !== 'string') {
    return { notFound: true };
  }
  const post = await prisma.post.findFirst({
    where: {
      AND: [
        {
          site: {
            ...(params.site.includes('.')
              ? { customDomain: params.site }
              : { subdomain: params.site }),
          },
        },
        {
          slug: params.slug,
        },
      ],
    },
    select: {
      id: true,
      slug: true,
      pageId: true,
    },
  });
  if (!post?.id) {
    return { notFound: true, revalidate: 10 };
  }

  const recordMap = await getPageRecordMap(post.pageId, post.id);

  return {
    props: {
      slug: post.slug,
      recordMap,
    },
    revalidate: 3600,
  };
};
