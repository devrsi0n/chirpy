import { CommonWidgetProps } from '@chirpy-dev/types';

import {
  CommentTimeline,
  WidgetLayout,
  PoweredBy,
  UserMenu,
} from '../../blocks';
import { IconButton, Heading, IconArrowLeft, Link } from '../../components';
import { CommentContextProvider } from '../../contexts';
import { trpcClient } from '../../utilities/trpc-client';

export type CommentTimelineWidgetProps = CommonWidgetProps & {
  commentId: string;
  pageId: string;
  pageURL: string;
};

export function CommentTimelineWidget(
  props: CommentTimelineWidgetProps,
): JSX.Element {
  const { data: comment } = trpcClient.comment.timeline.useQuery({
    id: props.commentId,
  });

  return (
    <WidgetLayout widgetTheme={props.theme} title="Comment timeline">
      <CommentContextProvider projectId={props.projectId} pageId={props.pageId}>
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
        {/* @ts-ignore */}
        {comment?.id && <CommentTimeline key={comment.id} comment={comment} />}
        <PoweredBy />
      </CommentContextProvider>
    </WidgetLayout>
  );
}
