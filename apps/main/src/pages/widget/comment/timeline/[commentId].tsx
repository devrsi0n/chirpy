import { cpDayjs } from 'ui';
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsResult,
} from 'next';
import { log } from 'next-axiom';
import * as React from 'react';
import superjson from 'superjson';
import { OperationResult } from 'urql';
import { pipe, subscribe } from 'wonka';
import {
  CommentTimeline,
  WidgetLayout,
  PoweredBy,
  UserMenu,
  IconButton,
  Heading,
  IconArrowLeft,
  Link,
  CommentContextProvider,
} from 'ui';
import {
  CommentTimelineDocument,
  CommentTimelineSubscription,
  useCommentTimelineSubscription,
  CommentsDocument,
  ThemeOfPageDocument,
} from '@chirpy-dev/graphql';
import { getAdminGqlClient } from '$/lib/admin-gql-client';
import { query } from '$/server/common/gql';
import { CommonWidgetProps, Theme, CommentTimelineNode } from 'types';
import { isSSRMode } from 'utils';

export default function CommentTimelineWidget(
  props: InferGetStaticPropsType<typeof getStaticProps>,
): JSX.Element {
  const [{ data }] = useCommentTimelineSubscription({
    variables: { id: props.commentId },
    pause: isSSRMode,
  });

  const comment = data?.commentByPk || props.comment;

  return (
    <WidgetLayout widgetTheme={props.theme} title="Comment timeline">
      <CommentContextProvider
        projectId={props.projectId}
        pageId={comment?.pageId || ''}
      >
        <div className="mb-4 flex flex-row items-center justify-between">
          {/* Can't use history.back() here in case user open this page individual */}
          <Link
            href={`/widget/comment/${encodeURIComponent(props.pageURL)}`}
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
        <PoweredBy />
      </CommentContextProvider>
    </WidgetLayout>
  );
}
type PathParams = {
  commentId: string;
};

type StaticProps = PathParams &
  CommonWidgetProps & {
    comment: CommentTimelineNode;
    pageURL: string;
  };

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  if (process.env.DOCKER) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
  const comments = await query(
    CommentsDocument,
    {
      newerThan: cpDayjs().subtract(1, 'day').toISOString(),
    },
    'comments',
  );

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

export const getStaticProps: GetStaticProps<StaticProps, PathParams> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<
  GetStaticPropsResult<StaticProps>
> => {
  if (!params?.commentId) {
    return { notFound: true };
  }
  const { commentId } = params;

  try {
    const { data } = await new Promise<
      OperationResult<CommentTimelineSubscription>
    >((resolve /*reject*/) => {
      pipe<OperationResult<CommentTimelineSubscription>, any>(
        client.subscription(CommentTimelineDocument, { id: commentId }),
        subscribe((result) => {
          // log.debug(result);
          resolve(result);
        }),
      );
    });

    if (!data?.commentByPk) {
      return { notFound: true };
    }

    const pageByPk = await query(
      ThemeOfPageDocument,
      {
        pageId: data.commentByPk.pageId,
      },
      'pageByPk',
    );
    if (!pageByPk) {
      log.error(`Can't find page info`);
      return { notFound: true };
    }

    return {
      props: {
        projectId: pageByPk.project.id,
        comment: data.commentByPk,
        commentId,
        pageURL: pageByPk.url,
        theme: (pageByPk.project.theme as Theme) || null,
        isWidget: true,
      },
      revalidate: 600,
    };
  } catch (error) {
    log.error(superjson.stringify(error));
    return { notFound: true };
  }
};
