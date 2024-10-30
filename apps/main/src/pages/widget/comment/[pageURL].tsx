import { prisma, ssg } from '@chirpy-dev/trpc';
import { Theme } from '@chirpy-dev/types';
import { PageCommentProps } from '@chirpy-dev/ui';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { log } from 'next-axiom';
import superjson from 'superjson';

/**
 * Comment tree widget for a page
 * @param props
 */

type PathParams = {
  pageURL: string;
};

// Get all project then prerender all their page comments
export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const freshPages = await prisma.page.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: {
      url: true,
    },
  });

  const paths: { params: PathParams }[] =
    freshPages
      // Nodejs FS can't handle too long file name, so we just don't build static json for those
      .filter(({ url }) => url.length < 128)
      .map(({ url }) => {
        return {
          params: {
            pageURL: url,
          },
        };
      }) || [];

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: 'blocking' };
};

type StaticProps = PageCommentProps;
type StaticError = {
  error: string;
};

export const getStaticProps: GetStaticProps<
  StaticProps | StaticError,
  PathParams
> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<
  GetStaticPropsResult<StaticProps | StaticError>
> => {
  if (!params?.pageURL) {
    return { notFound: true };
  }
  const { pageURL } = params;
  const page = await prisma.page.findUnique({
    where: {
      url: pageURL,
    },
    select: {
      id: true,
      url: true,
      authorId: true,
      project: {
        select: {
          id: true,
          theme: true,
          user: {
            select: {
              plan: true,
            },
          },
        },
      },
    },
  });
  const pageId = page?.id;
  if (!pageId) {
    return { notFound: true };
  }

  try {
    await Promise.all([
      ssg.comment.forest.prefetch({
        url: pageURL,
      }),
      ssg.comment.pinnedComments.prefetch({
        url: pageURL,
      }),
    ]);

    if (!page.project.id) {
      log.error(`Can't find  the project`, page);
      return { notFound: true };
    }
    return {
      props: {
        trpcState: ssg.dehydrate(),
        page,
        projectId: page.project.id,
        theme: (page.project.theme as Theme) || null,
        isWidget: true,
        plan: page.project.user?.plan || 'HOBBY',
      },
      revalidate: 5 * 60,
    };
  } catch (error) {
    log.error(superjson.stringify(error));
    return { notFound: true };
  }
};

export { CommentWidgetPage as default } from '@chirpy-dev/ui';
