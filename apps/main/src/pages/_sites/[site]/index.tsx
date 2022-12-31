import { getNotionId, prisma, notion } from '@chirpy-dev/trpc';
import { SitesIndexProps, SitesPage } from '@chirpy-dev/ui';
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
  const site = await prisma.site.findUnique({
    where: {
      ...(params.site.includes('.')
        ? { customDomain: params.site }
        : { subdomain: params.site }),
    },
    select: {
      id: true,
      templateUrl: true,
      subdomain: true,
      recordMap: true,
    },
  });
  if (!site?.id) {
    return { notFound: true, revalidate: 10 };
  }

  const pageId = getNotionId(site.templateUrl);
  if (!pageId) {
    return { notFound: true, revalidate: 10 };
  }
  const getPage: typeof notion.getPage = async (...args) => {
    return notion.getPage(...args);
  };
  const pages: SitesPage[] = [];
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
      // Skip the template table page
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
            siteId: site.id,
          },
        },
        create: {
          pageId: id,
          site: {
            connect: {
              id: site.id,
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
      ...site,
      pages,
    },
    revalidate: 3600,
  };
};
