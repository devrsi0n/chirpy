import { getNotionId, prisma, notion } from '@chirpy-dev/trpc';
import { SitesHomeProps, PostPage } from '@chirpy-dev/ui';
import Slugger from 'github-slugger';
import { GetStaticPaths, GetStaticProps } from 'next';
import { log } from 'next-axiom';
import {
  getAllPagesInSpace,
  getPageImageUrls,
  getPageProperty,
  getPageTitle,
} from 'notion-utils';

export { SitesHome as default } from '@chirpy-dev/ui';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<SitesHomeProps> = async ({
  params,
}) => {
  if (typeof params?.site !== 'string') {
    return { notFound: true };
  }
  const filterSite = {
    ...(params.site.includes('.')
      ? { customDomain: params.site }
      : { subdomain: params.site }),
  } as const;
  const [blogSite, docsSite] = await prisma.$transaction([
    prisma.blogSite.findUnique({
      where: filterSite,
      include: {
        posts: {
          select: {
            id: true,
            pageId: true,
            title: true,
            slug: true,
            coverImage: true,
            updatedAt: true,
          },
        },
      },
    }),
    prisma.docsSite.findUnique({
      where: filterSite,
    }),
  ]);
  if (!blogSite?.id && !docsSite?.id) {
    return { notFound: true, revalidate: 10 };
  }

  const pageId = getNotionId((blogSite || docsSite)?.pageUrl || '');
  if (!pageId) {
    return { notFound: true, revalidate: 10 };
  }
  if (blogSite?.id) {
    // Redirect to custom domain if avaliable
    if (!params.site.includes('.') && blogSite.customDomain) {
      return {
        redirect: {
          destination: `https://${blogSite.customDomain}`,
          permanent: false,
        },
      };
    }
    const getPage: typeof notion.getPage = async (...args) => {
      return notion.getPage(...args);
    };
    let posts: PostPage[] = blogSite.posts;
    try {
      const allPages = await getAllPagesInSpace(pageId, undefined, getPage);
      // console.log('allpages', JSON.stringify(allpages, null, 2));
      for (const [id, page] of Object.entries(allPages)) {
        if (!page) {
          continue;
        }
        const firstBlock = page.block[id].value;
        const lastEditedTime = getPageProperty(
          'Last edited time',
          firstBlock,
          page,
        );
        if (typeof lastEditedTime !== 'number') {
          // Skip the table page
          continue;
        }
        const title = getPageTitle(page);
        posts.push({
          pageId: id,
          title,
          slug: Slugger.slug(title),
          coverImage: getPageImageUrls(page, {
            mapImageUrl: (url) => url,
          })[0],
          updatedAt: new Date(lastEditedTime),
        });
      }
      // Create or update posts
      await prisma.$transaction(
        posts.map((page) => {
          const { pageId } = page;
          return prisma.post.upsert({
            where: {
              post_pageId_site_constraint: {
                pageId: pageId,
                siteId: blogSite.id,
              },
            },
            create: {
              ...page,
              site: {
                connect: {
                  id: blogSite.id,
                },
              },
            },
            update: {
              ...page,
            },
          });
        }),
      );
    } catch (error) {
      log.error(
        `Get or update posts error, reusing existing post data, error`,
        error,
      );
      posts = blogSite.posts;
    }
    log.debug('Blog posts', { posts });
    return {
      props: {
        blog: { ...blogSite, posts },
      },
      revalidate: 3600,
    };
  } else if (docsSite) {
    return {
      props: {
        docs: {
          ...docsSite,
        },
      },
      revalidate: 3600,
    };
  }
  return { notFound: true, revalidate: 10 };
};
