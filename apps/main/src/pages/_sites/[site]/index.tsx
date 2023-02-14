import {
  getNotionId,
  prisma,
  notion,
  ExtendedRecordMap,
  PageMap,
} from '@chirpy-dev/trpc';
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
            recordMap: true,
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

    let allPages: PageMap;
    try {
      allPages = await getAllPagesInSpace(pageId, undefined, getPage);
    } catch (error) {
      log.error(
        `Get or update posts error, reusing db post data, error`,
        error,
      );
      allPages = blogSite.posts.reduce((acc, post) => {
        // @ts-ignore
        acc[post.pageId] = post.recordMap as ExtendedRecordMap;
        return acc;
      }, {} as PageMap);
    }
    const posts: PostPage[] = [];
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
      const tags = getPageProperty('Tags', firstBlock, page) as string[];
      console.log({ tags });
      const title = getPageTitle(page);
      posts.push({
        pageId: id,
        title,
        slug: Slugger.slug(title),
        coverImage: getPageImageUrls(page, {
          mapImageUrl: (url) => url,
        })[0],
        tags,
        lastEditedTime,
      });
    }
    // Create or update posts
    await prisma.$transaction(
      posts.map((page) => {
        const {
          pageId,
          tags: _tags,
          lastEditedTime: _lastEditedTime,
          ...fields
        } = page;
        return prisma.post.upsert({
          where: {
            post_pageId_site_constraint: {
              pageId: pageId,
              siteId: blogSite.id,
            },
          },
          create: {
            pageId,
            ...fields,
            site: {
              connect: {
                id: blogSite.id,
              },
            },
          },
          update: {
            ...fields,
          },
        });
      }),
    );

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
