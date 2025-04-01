import { trpc, type RouterOutputs } from '@chirpy-dev/trpc/src/client';
import { CommonWidgetProps, type RTEValue } from '@chirpy-dev/types';
import { getTextFromRteValue } from '@chirpy-dev/utils';
import * as React from 'react';
import type {
  Comment,
  InteractionCounter,
  LikeAction,
  Person,
} from 'schema-dts';

import {
  CommentTimeline as CommentTimelineComponent,
  PoweredBy,
  UserMenu,
  WidgetLayout,
} from '../../blocks';
import { Heading, IconArrowLeft, IconButton, Link } from '../../components';
import { JSONLD } from '../../components/json-ld/json-ld';
import { CommentContextProvider } from '../../contexts';
import { useRefetchInterval } from './use-refetch-interval';

export type CommentTimelineWidgetProps = CommonWidgetProps & {
  commentId: string;
  page: {
    id: string;
    url: string;
    authorId: string | null;
  };
};

type TimelineComment = NonNullable<RouterOutputs['comment']['timeline']>;
/**
 * Creates a JSON-LD comment structure recursively for a comment and its replies
 */
function createCommentJsonLd(comment: TimelineComment): Comment | null {
  const author: Person = {
    '@type': 'Person',
    name: comment.user.name || '',
    image: comment.user.image || undefined,
  };

  const jsonldUrl = `https://chirpy.dev/widget/comment/timeline/${comment.id}`;
  const commentJsonLd: Comment = {
    '@type': 'Comment',
    text: getTextFromRteValue(comment.content as RTEValue),
    dateCreated: comment.createdAt.toISOString(),
    author: author,
    url: jsonldUrl,
    mainEntityOfPage: jsonldUrl,
  };

  // Add likes information if available
  if (comment.likes && comment.likes.length > 0) {
    commentJsonLd.interactionStatistic = {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/LikeAction' as unknown as LikeAction,
      userInteractionCount: comment.likes.length,
    } as InteractionCounter;
  }

  // Add information about parent comment if it exists
  if (comment.parentId) {
    commentJsonLd.parentItem = {
      '@type': 'Comment',
      url: `https://chirpy.dev/widget/comment/timeline/${comment.parentId}`,
    } as Comment;
  }

  // Recursively process replies (if they exist in the timeline data)
  if (comment.replies && comment.replies.length > 0) {
    commentJsonLd.comment = comment.replies
      .map((reply: any) => createCommentJsonLd(reply))
      .filter(Boolean) as Comment[];
  }

  return commentJsonLd;
}

export function CommentTimelineWidget(
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

  // Generate JSON-LD data for the comment timeline
  const jsonLdData = comment ? createCommentJsonLd(comment) : null;

  return (
    <WidgetLayout widgetTheme={props.theme} title="Comment timeline">
      {jsonLdData && (
        <JSONLD<Comment>
          data={{ '@context': 'https://schema.org', ...jsonLdData }}
        />
      )}
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

        {comment?.id && (
          <CommentTimelineComponent key={comment.id} comment={comment} />
        )}
        {props.plan === 'HOBBY' && <PoweredBy />}
      </CommentContextProvider>
    </WidgetLayout>
  );
}
