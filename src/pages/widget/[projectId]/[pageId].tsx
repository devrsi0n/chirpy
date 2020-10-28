import * as React from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Comment, User } from '@prisma/client';

import { prisma } from '$server/context';
import { Heading } from '$/components/Heading';
import { Comment as SectionComment } from '$/sections/Comment';

export type CommentProps = React.PropsWithChildren<InferGetStaticPropsType<typeof getStaticProps>>;

/**
 * Comment widget for a page
 * @param props
 */
export default function PageComment({ comments }: CommentProps): JSX.Element {
  return (
    <div>
      <Heading as="h2">This is a comment widget</Heading>
      <Heading>comments:</Heading>
      {comments?.map((comment) => (
        <SectionComment
          name={comment.user.name}
          avatar={comment.user.avatar!}
          content={comment.content}
          date={String(comment.createdAt)}
        />
      ))}
    </div>
  );
}

type PathParams = {
  projectId?: string;
  pageId?: string;
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

type StaticProps = PathParams & {
  comments?: (Comment & {
    user: User;
    replies: Comment[];
  })[];
  error?: string;
};

export const getStaticProps: GetStaticProps<StaticProps, PathParams> = async ({ params }) => {
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
