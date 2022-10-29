import {
  CommentTimelineDocument,
  CommentTimelineSubscription,
  CommentsDocument,
  ThemeOfPageDocument,
} from '@chirpy-dev/graphql';
import {
  CommonWidgetProps,
  Theme,
  CommentTimelineNode,
} from '@chirpy-dev/types';
import { cpDayjs } from '@chirpy-dev/ui';
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
  GetStaticPropsResult,
} from 'next';
import { log } from 'next-axiom';
import superjson from 'superjson';
import { OperationResult } from 'urql';
import { pipe, subscribe } from 'wonka';

import { getAdminGqlClient } from '$/lib/admin-gql-client';
import { query } from '$/server/common/gql';

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

export { CommentTimelineWidget as default } from '@chirpy-dev/ui';
