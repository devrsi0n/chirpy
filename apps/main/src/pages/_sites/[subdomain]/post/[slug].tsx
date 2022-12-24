import { getPageRecordMap, prisma } from '@chirpy-dev/trpc';
import { SitesPostProps } from '@chirpy-dev/ui';
import { GetStaticPaths, GetStaticProps } from 'next';

export { SitesPost as default } from '@chirpy-dev/ui';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<SitesPostProps> = async ({
  params,
}) => {
  if (
    typeof params?.slug !== 'string' ||
    typeof params?.subdomain !== 'string'
  ) {
    return { notFound: true };
  }
  const site = await prisma.site.findFirst({
    where: {
      AND: [
        {
          subdomain: params.subdomain,
        },
        {
          posts: {
            some: {
              slug: params.slug,
            },
          },
        },
      ],
    },
    select: {
      id: true,
      posts: {
        select: {
          id: true,
          slug: true,
          pageId: true,
        },
      },
    },
  });
  if (!site?.posts[0].slug) {
    return { notFound: true };
  }
  const [post] = site.posts;
  const recordMap = await getPageRecordMap(post.pageId, post.id);

  return {
    props: {
      slug: site?.posts[0].slug,
      recordMap,
    },
    revalidate: 3600,
  };
};
