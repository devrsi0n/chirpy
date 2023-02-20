import {
  getNotionId,
  prisma,
  ExtendedRecordMap,
  PageMap,
  getNotionPage,
  defaultMapImageUrl,
} from '@chirpy-dev/trpc';
import { SitesHomeProps, PostFields, PostAuthor } from '@chirpy-dev/ui';
import { isEqual } from '@chirpy-dev/utils';
import Slugger from 'github-slugger';
import { GetStaticPaths, GetStaticProps } from 'next';
import { log } from 'next-axiom';
import {
  estimatePageReadTime,
  getAllPagesInSpace,
  getPageImageUrls,
  getPageProperty,
  getPageTitle,
} from 'notion-utils';
import { JsonObject } from 'type-fest';

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
        manager: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        posts: {
          select: {
            id: true,
            pageId: true,
            recordMap: true,
            slug: true,
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

    let allPages: PageMap;
    const getSavedPages = () =>
      blogSite.posts.reduce((acc, post) => {
        // @ts-ignore
        acc[post.pageId] = post.recordMap as ExtendedRecordMap;
        return acc;
      }, {} as PageMap);
    try {
      allPages = await getAllPagesInSpace(pageId, undefined, getNotionPage);
      if (Object.values(allPages).filter(Boolean).length === 0) {
        allPages = getSavedPages();
      }
    } catch (error) {
      log.error(`Get all posts error, reusing db post data, error`, error);
      allPages = getSavedPages();
    }
    // console.log(JSON.stringify(allPages, null, 2));
    const posts: { fields: PostFields; recordMap: JsonObject }[] = [];
    for (const [pageId, pageRecordMap] of Object.entries(allPages)) {
      if (!pageRecordMap) {
        continue;
      }
      const rootBlock = pageRecordMap.block[pageId].value;
      const lastEditedTime = getPageProperty(
        'Last edited time',
        rootBlock,
        pageRecordMap,
      );
      if (typeof lastEditedTime !== 'number') {
        // Skip the table page
        continue;
      }
      const published = getPageProperty('Published', rootBlock, pageRecordMap);
      if (!published) {
        continue;
      }
      const tags = getPageProperty(
        'Tags',
        rootBlock,
        pageRecordMap,
      ) as string[];
      const title = getPageTitle(pageRecordMap);
      const readingTime = estimatePageReadTime(rootBlock, pageRecordMap, {
        wordsPerMinute: 200,
        imageReadTimeInSeconds: 12,
      }).totalReadTimeInMinutes;
      const images = getPageImageUrls(pageRecordMap, {
        mapImageUrl: defaultMapImageUrl,
      });
      const coverImage = images[0];
      // Can't read author info due to https://github.com/NotionX/react-notion-x/issues/44
      const authorMeta = getPageProperty(
        'Author',
        rootBlock,
        pageRecordMap,
      ) as string[];
      const author: PostAuthor = authorMeta
        ? {
            id: authorMeta[0][0],
            name: authorMeta[0][1],
            image: authorMeta[0][1],
          }
        : blogSite.manager;
      const excerpt = getPageProperty(
        'Excerpt',
        rootBlock,
        pageRecordMap,
      ) as string;
      const featured = getPageProperty(
        'Featured',
        rootBlock,
        pageRecordMap,
      ) as boolean;
      const slug = getPageProperty('Slug', rootBlock, pageRecordMap) as string;
      posts.push({
        fields: {
          pageId: pageId,
          title,
          // In case the wrong slug format
          slug: encodeURIComponent(slug) || Slugger.slug(title),
          coverImage,
          tags,
          lastEditedTime,
          readingTime: Math.round(readingTime) || 1,
          author,
          featured,
          excerpt,
        },
        recordMap: pageRecordMap as unknown as JsonObject,
      });
    }
    const upsertPosts = posts.filter((p) => {
      const savedPost = blogSite.posts.find(
        (post) => post.pageId === p.fields.pageId,
      );
      const shouldUpsert =
        !savedPost ||
        !savedPost.recordMap ||
        !isEqual(savedPost.recordMap as unknown as JsonObject, p.recordMap) ||
        savedPost.slug !== p.fields.slug;
      return shouldUpsert;
    });
    if (upsertPosts.length > 0) {
      // Create or update posts
      await prisma.$transaction(
        upsertPosts.map((page) => {
          const {
            fields: { pageId, slug },
            recordMap,
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
              slug,
              recordMap,
              site: {
                connect: {
                  id: blogSite.id,
                },
              },
            },
            update: {
              slug,
              recordMap,
            },
            select: {
              id: true,
              pageId: true,
            },
          });
        }),
      );
    }
    const sortedPosts = posts
      .map((p) => p.fields)
      .sort((a, b) => (a.lastEditedTime || 0) - (b.lastEditedTime || 0));
    return {
      props: {
        blog: {
          name: blogSite.name,
          posts: sortedPosts,
        },
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
