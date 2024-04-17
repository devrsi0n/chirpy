import { prisma, ssg } from '@chirpy-dev/trpc';
import { Theme } from '@chirpy-dev/types';
import { CommentTimelineWidgetProps } from '@chirpy-dev/ui';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { log } from 'next-axiom';
import superjson from 'superjson';

type PathParams = {
  commentId: string;
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
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
        },
      },
    });
    if (!data?.page.project.id) {
      log.error(`Can't find the project`, data || undefined);
      return { notFound: true };
    }

    return {
      props: {
        trpcState: ssg.dehydrate(),
        page: data.page,
        projectId: data.page.project.id,
        commentId,
        theme: (data.page.project.theme as Theme) || null,
        isWidget: true,
        plan: data.page.project.user?.plan || 'HOBBY',
      },
      revalidate: 600,
    };
  } catch (error) {
    log.error(superjson.stringify(error));
    return { notFound: true };
  }
};

export { CommentTimelineWidget as default } from '@chirpy-dev/ui';
