import {
  getNotionId,
  prisma,
  notion,
  ExtendedRecordMap,
  PageMap,
} from '@chirpy-dev/trpc';
import { SitesHomeProps, PostFields, PostAuthor } from '@chirpy-dev/ui';
import { isEqual } from '@chirpy-dev/utils';
import Slugger from 'github-slugger';
import { GetStaticPaths, GetStaticProps } from 'next';
import { log } from 'next-axiom';
import { Block } from 'notion-types';
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
      log.error(`Get all posts error, reusing db post data, error`, error);
      allPages = blogSite.posts.reduce((acc, post) => {
        // @ts-ignore
        acc[post.pageId] = post.recordMap as ExtendedRecordMap;
        return acc;
      }, {} as PageMap);
    }
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
      posts.push({
        fields: {
          pageId: pageId,
          title,
          slug: Slugger.slug(title),
          coverImage,
          tags,
          lastEditedTime,
          readingTime: Math.round(readingTime) || 1,
          author,
        },
        recordMap: pageRecordMap as unknown as JsonObject,
      });
    }
    const upsertPosts = posts.filter((p) => {
      const savedPost = blogSite.posts.find(
        (post) => post.pageId === p.fields.pageId,
      );
      const shouldFilter =
        !savedPost ||
        !savedPost.recordMap ||
        !isEqual(savedPost.recordMap as unknown as JsonObject, p.recordMap);
      return shouldFilter;
    });
    if (upsertPosts.length > 0) {
      // Create or update posts
      await prisma.$transaction(
        upsertPosts.map((page) => {
          const {
            fields: { pageId },
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
              recordMap,
              site: {
                connect: {
                  id: blogSite.id,
                },
              },
            },
            update: {
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

    // log.debug('Blog posts', { posts });
    return {
      props: {
        blog: {
          name: blogSite.name,
          posts: posts
            .map((p) => p.fields)
            .sort((a, b) => (a.lastEditedTime || 0) - (b.lastEditedTime || 0)),
          tags: [...new Set(posts.flatMap((p) => p.fields.tags || []))],
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

function defaultMapImageUrl(url: string, block: Block): string | null {
  if (!url) {
    return null;
  }

  if (url.startsWith('data:')) {
    return url;
  }

  // more recent versions of notion don't proxy unsplash images
  if (url.startsWith('https://images.unsplash.com')) {
    return url;
  }

  try {
    const u = new URL(url);

    if (
      u.pathname.startsWith('/secure.notion-static.com') &&
      u.hostname.endsWith('.amazonaws.com') &&
      u.searchParams.has('X-Amz-Credential') &&
      u.searchParams.has('X-Amz-Signature') &&
      u.searchParams.has('X-Amz-Algorithm')
    ) {
      // if the URL is already signed, then use it as-is
      return url;
    }
  } catch {
    // ignore invalid urls
  }

  if (url.startsWith('/images')) {
    url = `https://www.notion.so${url}`;
  }

  url = `https://www.notion.so${
    url.startsWith('/image') ? url : `/image/${encodeURIComponent(url)}`
  }`;

  const notionImageUrlV2 = new URL(url);
  let table = block.parent_table === 'space' ? 'block' : block.parent_table;
  if (table === 'collection' || table === 'team') {
    table = 'block';
  }
  notionImageUrlV2.searchParams.set('table', table);
  notionImageUrlV2.searchParams.set('id', block.id);
  notionImageUrlV2.searchParams.set('cache', 'v2');

  url = notionImageUrlV2.toString();

  return url;
}
