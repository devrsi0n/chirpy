import dayjs from 'dayjs';
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsResult,
} from 'next';
import * as React from 'react';
import ssrPrepass from 'react-ssr-prepass';
import superjson from 'superjson';
import { Provider } from 'urql';

import { CommentTimeline } from '$/blocks/comment-timeline';
import { WidgetLayout } from '$/blocks/layout';
import { PoweredBy } from '$/blocks/powered-by';
import { UserMenu } from '$/blocks/user-menu';
import { IconButton } from '$/components/button';
import { Heading } from '$/components/heading';
import { IconArrowLeft } from '$/components/icons';
import { Link } from '$/components/link';
import { CommentContextProvider } from '$/contexts/comment-context';
import { useCommentTimelineSubscription } from '$/graphql/generated/comment';
import { ThemeOfCommentDocument, ThemeOfCommentQuery } from '$/graphql/generated/page';
import { getAdminGqlClient, getAdminGqlClientWithSsrExchange } from '$/lib/admin-gql-client';
import { CommentsDocument, CommentsQuery } from '$/server/graphql/generated/comment';
import { CommonWidgetProps } from '$/types/page.type';
import { Theme } from '$/types/theme.type';
import { isSSRMode } from '$/utilities/env';

export default function CommentTimelineWidget(
  props: InferGetStaticPropsType<typeof getStaticProps>,
): JSX.Element {
  const [{ data }] = useCommentTimelineSubscription({
    variables: { id: props.commentId },
    pause: isSSRMode,
  });

  const comment = data?.commentByPk;

  return (
    <WidgetLayout widgetTheme={props.theme} title="Comment timeline">
      <CommentContextProvider projectId={props.projectId} pageId={comment?.pageId || ''}>
        <div className="mb-4 flex flex-row items-center justify-between">
          {/* Can't use history.back() here in case user open this page individual */}
          <Link href={`/widget/comment/${encodeURIComponent(props.pageURL)}`} variant="plain">
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
    pageURL: string;
  };

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const client = getAdminGqlClient();
  // Only query a small set of comments to avoid too long build time
  const { data, error } = await client
    .query<CommentsQuery>(CommentsDocument, {
      newerThan: dayjs().subtract(1, 'day').toISOString(),
    })
    .toPromise();
  if (error) {
    console.error(`Can't find the comments, error: ${error}`);
  }
  const paths =
    data?.comments.map(({ id }) => ({
      params: {
        commentId: id,
      },
    })) || [];
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<StaticProps, PathParams> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<GetStaticPropsResult<StaticProps>> => {
  if (!params?.commentId) {
    return { notFound: true };
  }
  const { commentId } = params;
  const { client, ssrExchange } = getAdminGqlClientWithSsrExchange();

  try {
    const themeResult = await client
      .query<ThemeOfCommentQuery>(ThemeOfCommentDocument, {
        commentId,
      })
      .toPromise();
    if (!themeResult.data?.commentByPk) {
      console.error(`Can't find comment theme info`);
      return { notFound: true };
    }
    const commonProps = {
      projectId: themeResult.data.commentByPk.page.project.id,
      commentId,
      pageURL: themeResult.data.commentByPk.page.url,
      theme: (themeResult.data.commentByPk.page.project.theme as Theme) || null,
      isWidget: true as const,
    };

    await ssrPrepass(
      <Provider value={client}>
        <CommentTimelineWidget {...commonProps} />
      </Provider>,
    );

    return {
      props: {
        ...commonProps,
        urqlState: ssrExchange.extractData(),
      },
    };
  } catch (error) {
    console.error(superjson.stringify(error));
    return { notFound: true };
  }
};
