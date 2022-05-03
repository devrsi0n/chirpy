import ArrowLeft from '@geist-ui/react-icons/arrowLeft';
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsResult,
} from 'next';
import * as React from 'react';
import superjson from 'superjson';
import { OperationResult } from 'urql';
import { pipe, subscribe } from 'wonka';

import { CommentLinkedList, WidgetLayout, PoweredBy, UserMenu } from '@chirpy/blocks';
import { IconButton, Heading, Link } from '@chirpy/components';
import { CommentContextProvider } from '@chirpy/contexts';
import {
  CommentDetailsDocument,
  CommentDetailsSubscription,
  useCommentDetailsSubscription,
} from '@chirpy/client-graphql/generated/comment';
import { ThemeOfPageDocument, ThemeOfPageQuery } from '@chirpy/client-graphql/generated/page';
import { useCreateAComment, useToggleALikeAction } from '@chirpy/contexts';
import { useWidgetSideEffects } from '@chirpy/hooks';
import { getAdminGqlClient } from '$/lib/admin-gql-client';
import { CommentsDocument, CommentsQuery } from '@chirpy/server-graphql/generated/comment';
import { CommonWidgetProps } from '@chirpy/types';
import { Theme } from '@chirpy/types';
import { CommentDetailNode } from '@chirpy/types';
import { ssrMode } from '@chirpy/utilities';

// TODO: Migrate this page to a dialog widget (for analytics)
export default function CommentDetailsWidget(
  props: InferGetStaticPropsType<typeof getStaticProps>,
): JSX.Element {
  const handleSubmitReply = useCreateAComment({ pageId: props.comment?.pageId || '' });

  const handleClickLikeAction = useToggleALikeAction();
  const [{ data }] = useCommentDetailsSubscription({
    variables: { id: props.commentId },
    pause: ssrMode,
  });

  useWidgetSideEffects();

  const comment = data?.commentByPk || props.comment;

  return (
    <WidgetLayout widgetTheme={props.theme} title="Comment details">
      <CommentContextProvider projectId={props.projectId}>
        <div className="flex flex-row justify-between items-center mb-4">
          <Link href={`/widget/comment/${encodeURIComponent(props.pageURL)}`} variant="plain">
            <IconButton className="translate-x-1">
              <ArrowLeft size={20} />
            </IconButton>
          </Link>
          <Heading as="h4">
            <span className="font-bold">{comment?.user.name}</span>
            <span>{`'s comment details`}</span>
          </Heading>
          <UserMenu variant="Widget" />
        </div>
        {comment?.id && (
          <CommentLinkedList
            key={comment.id}
            comment={comment}
            onClickLikeAction={handleClickLikeAction}
            onSubmitReply={handleSubmitReply}
          />
        )}
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
    comment: CommentDetailNode;
    pageURL: string;
  };

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const client = getAdminGqlClient();
  const { data, error } = await client.query<CommentsQuery>(CommentsDocument).toPromise();
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
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<StaticProps, PathParams> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<GetStaticPropsResult<StaticProps>> => {
  if (!params?.commentId) {
    return { notFound: true };
  }
  const { commentId } = params;
  const client = getAdminGqlClient();

  try {
    const { data } = await new Promise<OperationResult<CommentDetailsSubscription>>(
      (resolve /*reject*/) => {
        // @ts-ignore
        /*const { unsubscribe } = */ pipe<OperationResult<CommentDetailsSubscription>>(
          client.subscription(CommentDetailsDocument, { id: commentId }),
          subscribe((result) => {
            // console.log(result);
            resolve(result);
          }),
        );
      },
    );

    if (!data?.commentByPk) {
      return { notFound: true };
    }

    const themeResult = await client
      .query<ThemeOfPageQuery>(ThemeOfPageDocument, {
        pageId: data.commentByPk.pageId,
      })
      .toPromise();
    if (!themeResult.data?.pageByPk) {
      console.error(`Can't find page info`);
      return { notFound: true };
    }

    return {
      props: {
        projectId: themeResult.data.pageByPk.project.id,
        comment: data.commentByPk,
        commentId,
        pageURL: themeResult.data.pageByPk.url,
        theme: (themeResult.data.pageByPk.project.theme as Theme) || null,
        isWidget: true,
      },
      revalidate: 600,
    };
  } catch (error) {
    console.error(superjson.stringify(error));
    return { notFound: true };
  }
};
