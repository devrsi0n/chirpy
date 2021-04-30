import { useSubscription } from '@apollo/client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPropsResult,
  GetStaticPropsContext,
  GetStaticPaths,
} from 'next';
import Head from 'next/head';
import * as React from 'react';
import superjson from 'superjson';
import tw from 'twin.macro';

import { getAdminApollo } from '$server/common/admin-apollo';
import { PagesDocument } from '$server/graphql/generated/page';

import { CommentTree } from '$/blocks/CommentTree/CommentTree';
import { PoweredBy } from '$/blocks/PoweredBy';
import { RichTextEditor } from '$/blocks/RichTextEditor';
import { UserDropDown } from '$/blocks/UserDropDown/UserDropDown';
import { Heading } from '$/components/Heading';
import { Layout } from '$/components/Layout';
import { useTheme } from '$/components/ThemeProvider';
import { CommentTreeQuery, CommentTreeQueryVariables } from '$/graphql/generated/comment';
import { useCreateAComment } from '$/hooks/useCreateAComment';
import { useCurrentUser } from '$/hooks/useCurrentUser';
import { useNotifyHostHeightOfPage } from '$/hooks/useNotifyHostHeightOfPage';
import { useToggleALikeAction } from '$/hooks/useToggleALikeAction';
import { CommentLeafType } from '$/types/widget';
import { getQueryCommentTreeDoc, getSubscribeCommentTreeDoc } from '$/utilities/comment-request';
import { getCommentCount } from '$/utilities/get-comment-count';

dayjs.extend(relativeTime);

export type PageCommentProps = InferGetStaticPropsType<typeof getStaticProps>;

// Demo: http://localhost:3000/widget/comment/b5a16120-593c-492f-ad94-e14d247485f3

/**
 * Comment tree widget for a page
 * @param props
 */
export default function CommentPageWidget(props: PageCommentProps): JSX.Element {
  let error = '';
  let pageId = '';

  if (isStaticError(props)) {
    error = props.error!;
  } else {
    pageId = props.pageId;
  }
  const { data } = useSubscription<CommentTreeQuery, CommentTreeQueryVariables>(
    getSubscribeCommentTreeDoc(),
    {
      variables: { pageId },
    },
  );
  const comments = data?.comments || (isStaticError(props) ? [] : props.comments || []);
  const { isLogin } = useCurrentUser();

  const handleSubmitReply = useCreateAComment({ pageId });

  const handleClickLikeAction = useToggleALikeAction();

  useNotifyHostHeightOfPage();

  const { mergeTheme } = useTheme();
  const theme = comments[0]?.page.project.theme;
  React.useEffect(() => {
    if (theme) {
      mergeTheme(theme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  if (error) {
    return <p>{error}</p>;
  }
  // TODO: resolve this comments undefined error
  if (!comments) {
    return <p>Wrong page.</p>;
  }
  const commentCount = getCommentCount(comments);

  return (
    <Layout noFooter noHeader>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME} Comment</title>
      </Head>
      <div css={tw`space-y-4`}>
        <div tw="flex flex-row justify-between items-end">
          <Heading as="h3" tw="text-2xl">
            {formatTitle(commentCount)}
          </Heading>
          <UserDropDown />
        </div>
        <div css={tw`space-y-7`}>
          <div css={tw`space-y-2`}>
            <RichTextEditor
              onSubmit={handleSubmitReply}
              postButtonLabel={!isLogin ? 'Sign in' : undefined}
            />
          </div>

          <ul>
            {comments?.map((comment: CommentLeafType) => (
              <CommentTree
                key={comment.id}
                comment={comment}
                onClickLikeAction={handleClickLikeAction}
                onSubmitReply={handleSubmitReply}
              />
            ))}
          </ul>
        </div>
      </div>
      <PoweredBy />
    </Layout>
  );
}

type PathParams = {
  pageId: string;
};

// Get all project then prerender all their page comments
export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const adminApollo = getAdminApollo();
  const pages = (
    await adminApollo.query({
      query: PagesDocument,
    })
  ).data.pages;

  const paths: { params: PathParams }[] = pages.map(({ id }) => {
    return {
      params: {
        pageId: id,
      },
    };
  });

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
};

type StaticProps = PathParams & {
  comments: CommentLeafType[];
};
type StaticError = {
  error: string;
};

export const getStaticProps: GetStaticProps<StaticProps | StaticError, PathParams> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<GetStaticPropsResult<StaticProps | StaticError>> => {
  try {
    if (!params?.pageId) {
      return { notFound: true };
    }
    const { pageId } = params;
    const adminApollo = getAdminApollo();
    const pageResult = await adminApollo.query({
      query: getQueryCommentTreeDoc(),
      variables: {
        pageId,
      },
    });

    if (!pageResult.data?.comments) {
      return { notFound: true };
    }
    const { comments } = pageResult.data;
    return {
      props: { comments, pageId },
      revalidate: 1,
    };
  } catch (error) {
    console.error(superjson.stringify(error));
    throw new Error(error);
  }
};

function isStaticError(props: $TsAny): props is StaticError {
  return !!props.error;
}

function formatTitle(count: number): string {
  if (count === 0) {
    return 'Comment';
  } else if (count === 1) {
    return '1 comment';
  }
  return `${count} comments`;
}
