import { useSubscription } from '@apollo/client';
import {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPropsResult,
  GetStaticPropsContext,
  GetStaticPaths,
} from 'next';
import Head from 'next/head';
import tw from 'twin.macro';

import { getAdminApollo } from '$server/common/admin-apollo';
import { PagesDocument } from '$server/graphql/generated/page';

import { CommentTree } from '$/blocks/CommentTree/CommentTree';
import { DropDownLogin } from '$/blocks/DropDownLogin/DropDownLogin';
import { DropDownUser } from '$/blocks/DropDownUser/DropDownUser';
import { PoweredBy } from '$/blocks/PoweredBy';
import { RichTextEditor } from '$/blocks/RichTextEditor';
import { Tabs } from '$/components/Tabs';
import { CommentTreeQuery, CommentTreeQueryVariables } from '$/graphql/generated/comment';
import { useCreateAComment } from '$/hooks/useCreateAComment';
import { useCurrentUser } from '$/hooks/useCurrentUser';
import { useNotifyHostPageOfHeight } from '$/hooks/useNotifyHostPageOfHeight';
import { useToggleALikeAction } from '$/hooks/useToggleALikeAction';
import { CommentLeafType } from '$/types/widget';
import { getQueryCommentTreeDoc, getSubscribeCommentTreeDoc } from '$/utilities/comment-request';

export type PageCommentProps = InferGetStaticPropsType<typeof getStaticProps>;

// Demo: http://localhost:3000/widget/comment/ckiwwumiv0001uzcv79wjhagt

const COMMENT_TAB_VALUE = 'Comment';

/**
 * Comment widget for a page
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
  const comments = data?.comments || (isStaticError(props) ? [] : props.comments);
  const { isLogin, avatar, displayName } = useCurrentUser();

  const handleSubmitReply = useCreateAComment({ pageId });

  const handleClickLikeAction = useToggleALikeAction();

  useNotifyHostPageOfHeight();

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="main-container" css={tw`py-8`}>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME} Comment</title>
      </Head>
      <Tabs
        initialValue={COMMENT_TAB_VALUE}
        rightItems={
          isLogin ? <DropDownUser avatar={avatar} name={displayName} /> : <DropDownLogin />
        }
      >
        <Tabs.Item label={`Comments`} value={COMMENT_TAB_VALUE}>
          <div css={tw`space-y-7`}>
            <div css={tw`space-y-2`}>
              <RichTextEditor
                onSubmit={handleSubmitReply}
                postButtonLabel={!isLogin ? 'Login' : undefined}
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
        </Tabs.Item>
        <Tabs.Item
          label={process.env.NEXT_PUBLIC_APP_NAME}
          value={process.env.NEXT_PUBLIC_APP_NAME}
        />
      </Tabs>
      <PoweredBy />
    </div>
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
    console.error(error);
    throw new Error(error);
  }
};

function isStaticError(props: $TsAny): props is StaticError {
  return !!props.error;
}
