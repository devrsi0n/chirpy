import * as React from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import { prisma } from '$server/context';
import { Comment as SectionComment } from '$/blocks/Comment';
import { RichTextEditor } from '$/blocks/RichTextEditor/RichTextEditor';
import { Node } from 'slate';
import { Tabs } from '$/components/Tabs/Tabs';
import { Button } from '$/components/buttons/Button';
import { Text } from '$/components/Text';
import { useCurrentUser } from '$/hooks/useCurrentUser';
import {
  useCreateOneCommentMutation,
  GetAllCommentsByPageDocument,
  Comment,
  GetAllCommentsByPageQueryVariables,
} from '$/generated/graphql';
import { useApollo } from '$/lib/apollo-client';
import { DropDownLogin } from '$/blocks/DropDownLogin';
import { DropDownUser } from '$/blocks/DropDownUser';

export type CommentProps = InferGetStaticPropsType<typeof getStaticProps>;

// Demo: http://localhost:3000/widget/ckgji3ebs0019fncvpx2oa6x6/ckgp3mwax0000hmcvo897omp3

const COMMENT_TAB_VALUE = 'Comment';

/**
 * Comment widget for a page
 * @param props
 */
export default function PageComment({ comments: _comments, pageId }: CommentProps): JSX.Element {
  const { isLogin, data: userData } = useCurrentUser();
  const [input, setInput] = React.useState<Node[]>();
  const [comments, setComments] = React.useState<Comment[]>(_comments);

  const client = useApollo();

  const [createOneComment, { data, loading, error }] = useCreateOneCommentMutation();
  const handleSubmit = React.useCallback(() => {
    if (!userData?.currentUser?.id) {
      console.error('login first');
      return;
    }
    createOneComment({
      variables: {
        pageId,
        content: input,
        userId: userData.currentUser.id,
      },
    }).then(() => {
      client
        .query<{ getAllCommentsByPage: Comment[] }, GetAllCommentsByPageQueryVariables>({
          query: GetAllCommentsByPageDocument,
          variables: {
            pageId,
          },
        })
        .then((data) => {
          setInput(undefined);
          setComments(data.data.getAllCommentsByPage);
        });
    });
  }, [input, pageId, userData?.currentUser?.id, createOneComment, client]);

  return (
    <div className="max-w-md mx-auto my-3">
      <Tabs
        initialValue={COMMENT_TAB_VALUE}
        className="mb-3"
        rightItems={
          isLogin && userData?.currentUser?.avatar && userData?.currentUser?.name ? (
            <DropDownUser
              avatar={userData?.currentUser?.avatar}
              name={userData?.currentUser?.name}
            />
          ) : (
            <DropDownLogin />
          )
        }
      >
        <Tabs.Item label={`${comments.length} comments`} value={COMMENT_TAB_VALUE}>
          <div className="space-y-2">
            {comments?.map((comment: Comment) => (
              <SectionComment
                key={comment.id}
                name={comment.user.name}
                avatar={comment.user.avatar!}
                content={comment.content}
                date={String((comment as $TsFixMe).createdAt as string)}
              />
            ))}
            <RichTextEditor
              {...{
                ...(!isLogin && {
                  disabled: true,
                  placeholder: [
                    {
                      type: 'paragraph',
                      children: [{ text: `Please login first.` }],
                    },
                  ],
                }),
              }}
              value={input}
              onChange={setInput}
            />
            <div className="flex flex-row justify-end">
              {isLogin ? <Button onClick={handleSubmit}>Submit</Button> : <Button>Login</Button>}
            </div>
          </div>
        </Tabs.Item>
        <Tabs.Item
          label={process.env.NEXT_PUBLIC_APP_NAME}
          value={process.env.NEXT_PUBLIC_APP_NAME}
        />
      </Tabs>
      <Text className="text-right">Powered by {process.env.NEXT_PUBLIC_APP_NAME}</Text>
    </div>
  );
}

type PathParams = {
  projectId: string;
  pageId: string;
};

// Get all project then prerender all their page comments
export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const projects = await prisma.project.findMany({
    include: {
      pages: {
        include: {
          comments: true,
        },
      },
    },
  });
  const paths: { params: PathParams }[] = [];
  projects.forEach((project) =>
    project.pages?.forEach((page) => {
      paths.push({
        params: {
          projectId: project.id,
          pageId: page.id,
        },
      });
    }),
  );

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
};

type StaticProps = PathParams & {
  comments: Comment[];
};

export const getStaticProps: GetStaticProps<StaticProps, PathParams> = async ({ params }) => {
  try {
    if (!params) {
      return { props: { error: 'Error' } };
    }
    const { projectId, pageId } = params;
    // console.log({ params });
    const project = await prisma.project.findOne({
      where: {
        id: projectId,
      },
      include: {
        pages: {
          where: {
            id: pageId,
          },
          include: {
            comments: {
              include: {
                user: true,
                replies: true,
              },
            },
          },
        },
      },
    });
    return {
      props: { projectId, pageId, comments: project?.pages[0]?.comments },
      // TODO: Shorter time for pro user?
      revalidate: 60 * 60,
    };
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
