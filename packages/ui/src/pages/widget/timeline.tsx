import { trpcClient } from '@chirpy-dev/trpc/src/client';
import { CommonWidgetProps } from '@chirpy-dev/types';
import * as React from 'react';

import {
  CommentTimeline,
  WidgetLayout,
  PoweredBy,
  UserMenu,
} from '../../blocks';
import { IconButton, Heading, IconArrowLeft, Link } from '../../components';
import { CommentContextProvider } from '../../contexts';
import { useRefetchInterval } from './use-refetch-interval';

export type CommentTimelineWidgetProps = CommonWidgetProps & {
  commentId: string;
  pageId: string;
  pageURL: string;
};

export function CommentTimelineWidget(
  props: CommentTimelineWidgetProps,
): JSX.Element {
  const refetchInterval = useRefetchInterval();
  const { data: comment, refetch } = trpcClient.comment.timeline.useQuery(
    {
      id: props.commentId,
    },
    {
      refetchInterval,
    },
  );

  return (
    <WidgetLayout widgetTheme={props.theme} title="Comment timeline">
      <CommentContextProvider
        projectId={props.projectId}
        pageId={props.pageId}
        refetchComment={refetch}
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
