import { getNotionId, prisma, notion } from '@chirpy-dev/trpc';
import { SitesIndexProps, PostPage } from '@chirpy-dev/ui';
import Slugger from 'github-slugger';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  getAllPagesInSpace,
  getPageImageUrls,
  getPageProperty,
  getPageTitle,
} from 'notion-utils';

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
  if (typeof params?.site !== 'string') {
    return { notFound: true };
  }
  const [blogSite, docsSite] = await prisma.$transaction([
    prisma.blogSite.findUnique({
      where: {
        ...(params.site.includes('.')
          ? { customDomain: params.site }
          : { subdomain: params.site }),
      },
      select: {
        id: true,
        name: true,
        pageUrl: true,
        subdomain: true,
        recordMap: true,
      },
    }),
    prisma.docsSite.findUnique({
      where: {
        ...(params.site.includes('.')
          ? { customDomain: params.site }
          : { subdomain: params.site }),
      },
      select: {
        id: true,
        name: true,
        pageUrl: true,
        subdomain: true,
        recordMap: true,
      },
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
    const getPage: typeof notion.getPage = async (...args) => {
      return notion.getPage(...args);
    };
    const pages: PostPage[] = [];
    const allpages = await getAllPagesInSpace(pageId, undefined, getPage);
    // console.log('allpages', JSON.stringify(allpages, null, 2));
    for (const [id, page] of Object.entries(allpages)) {
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
      pages.push({
        id,
        title,
        slug: Slugger.slug(title),
        image: getPageImageUrls(page, {
          mapImageUrl: (url) => url,
        })[0],
        lastEditedTime,
      });
    }
    // Create or update posts
    await prisma.$transaction(
      pages.map((page) => {
        const { id, slug } = page;
        return prisma.post.upsert({
          where: {
            post_pageId_site_constraint: {
              pageId: id,
              siteId: blogSite.id,
            },
          },
          create: {
            pageId: id,
            site: {
              connect: {
                id: blogSite.id,
              },
            },
            slug,
          },
          update: {
            slug,
          },
        });
      }),
    );
    console.log({ pages });
    return {
      props: {
        blog: { ...blogSite, pages },
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
