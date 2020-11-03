import * as React from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Comment, User } from '@prisma/client';

import { prisma } from '$server/context';
import { Heading } from '$/components/Heading';
import { Comment as SectionComment } from '$/blocks/Comment';
import { CommentInput } from '$/blocks/CommentInput';
import { RichTextEditor } from '$/blocks/RichTextEditor/RichTextEditor';

export type CommentProps = React.PropsWithChildren<InferGetStaticPropsType<typeof getStaticProps>>;

// Demo: http://localhost:3000/widget/ckgji3ebs0019fncvpx2oa6x6/ckgp3mwax0000hmcvo897omp3

/**
 * Comment widget for a page
 * @param props
 */
export default function PageComment({
  comments,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const [input, setInput] = React.useState('');
  const handleChangeInput = React.useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  }, []);
  return (
    <div className="max-w-md mx-auto">
      {/* <Heading as="h2">This is a comment widget</Heading> */}
      <Heading>comments:</Heading>
      {comments?.map((comment: $TsFixMe) => (
        <SectionComment
          key={comment.id}
          name={comment.user.name}
          avatar={comment.user.avatar!}
          content={comment.content}
          date={String(comment.createdAt)}
        />
      ))}
      <RichTextEditor /*value={input} onChange={handleChangeInput}*/ />
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
  const paths = projects
    .map((project) =>
      project.pages?.map((page) => ({
        params: {
          projectId: project.id,
          pageId: page.id,
        },
      })),
    )
    .flat();

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
};

// type StaticProps = PathParams & {
//   comments?: (Comment & {
//     user: User;
//     replies: Comment[];
//   })[];
//   error?: string;
// };

export const getStaticProps: GetStaticProps<$TsFixMe, PathParams> = async ({ params }) => {
  try {
    if (!params) {
      return { props: { error: 'Error' } };
    }
    const { projectId, pageId } = params!;
    console.log({ params });
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
    return { props: { projectId, pageId, comments: project?.pages[0]?.comments } };
  } catch (err) {
    return { props: { error: err?.message } };
  }
};
