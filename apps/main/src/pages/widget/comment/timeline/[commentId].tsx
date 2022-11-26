import { prisma, ssg } from '@chirpy-dev/trpc';
import { CommonWidgetProps, Theme } from '@chirpy-dev/types';
import { CommentTimelineWidgetProps } from '@chirpy-dev/ui';
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
  GetStaticPropsResult,
} from 'next';
import { log } from 'next-axiom';
import superjson from 'superjson';

import { getAdminGqlClient } from '$/lib/admin-gql-client';

type PathParams = {
  commentId: string;
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  if (process.env.DOCKER) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: {
      id: true,
    },
  });

  const paths =
    comments.map(({ id }) => ({
      params: {
        commentId: id,
      },
    })) || [];
  return {
    paths,
    fallback: 'blocking',
  };
};

const client = getAdminGqlClient();

export const getStaticProps: GetStaticProps<
  CommentTimelineWidgetProps,
  PathParams
> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<
  GetStaticPropsResult<CommentTimelineWidgetProps>
> => {
  if (!params?.commentId) {
    return { notFound: true };
  }
  const { commentId } = params;

  try {
    await ssg.comment.timeline.prefetch({ id: commentId });

    const data = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      select: {
        page: {
          select: {
            id: true,
            url: true,
            project: {
              select: {
                id: true,
                theme: true,
              },
            },
          },
        },
      },
    });
    if (!data?.page.project.id) {
      log.error(`Can't find theme info`);
      return { notFound: true };
    }

    return {
      props: {
        trpcState: ssg.dehydrate(),
        pageId: data.page.id,
        projectId: data.page.project.id,
        commentId,
        pageURL: data.page.url,
        theme: (data.page.project.theme as Theme) || null,
        isWidget: true,
      },
      revalidate: 600,
    };
  } catch (error) {
    log.error(superjson.stringify(error));
    return { notFound: true };
  }
};

export { CommentTimelineWidget as default } from '@chirpy-dev/ui';
