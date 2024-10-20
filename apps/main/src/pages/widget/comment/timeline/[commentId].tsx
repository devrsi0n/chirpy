import { prisma, ssg } from '@chirpy-dev/trpc';
import { trpc } from '@chirpy-dev/trpc/src/client';
import { CommonWidgetProps, Theme } from '@chirpy-dev/types';
import { Heading, IconArrowLeft, IconButton, Link } from '@chirpy-dev/ui';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { log } from 'next-axiom';
import * as React from 'react';
import superjson from 'superjson';

import { CommentTimeline } from '../../../../components/comment-timeline';
import { WidgetLayout } from '../../../../components/layout';
import { PoweredBy } from '../../../../components/powered-by';
import { UserMenu } from '../../../../components/user-menu';
import { CommentContextProvider } from '../../../../contexts/comment-context';
import { useRefetchInterval } from '../../../../hooks/use-refetch-interval';

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

export type CommentTimelineWidgetProps = CommonWidgetProps & {
  commentId: string;
  page: {
    id: string;
    url: string;
    authorId: string | null;
  };
};

export default function CommentTimelineWidget(
  props: CommentTimelineWidgetProps,
): JSX.Element {
  const refetchInterval = useRefetchInterval();
  const { data: comment } = trpc.comment.timeline.useQuery(
    {
      id: props.commentId,
    },
    {
      refetchInterval,
    },
  );

  return (
    <WidgetLayout widgetTheme={props.theme} title="Comment timeline">
      <CommentContextProvider projectId={props.projectId} page={props.page}>
        <div className="mb-4 flex flex-row items-center justify-between">
          {/* Can't use history.back() here in case user open this page individual */}
          <Link
            href={`/widget/comment/${encodeURIComponent(props.page.url)}`}
            variant="plain"
          >
            <IconButton className="translate-x-1">
              <IconArrowLeft size={20} />
            </IconButton>
          </Link>
          <Heading as="h4">
            <span className="font-bold">{comment?.user.name}</span>
            <span>{`'s comment timeline`}</span>
          </Heading>
          <UserMenu variant="Widget" />
        </div>

        {comment?.id && <CommentTimeline key={comment.id} comment={comment} />}
        {props.plan === 'HOBBY' && <PoweredBy />}
      </CommentContextProvider>
    </WidgetLayout>
  );
}
