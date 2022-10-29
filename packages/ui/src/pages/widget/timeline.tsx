import { useCommentTimelineSubscription } from '@chirpy-dev/graphql';
import { CommonWidgetProps, CommentTimelineNode } from '@chirpy-dev/types';
import { isSSRMode } from '@chirpy-dev/utils';

import {
  CommentTimeline,
  WidgetLayout,
  PoweredBy,
  UserMenu,
} from '../../blocks';
import { IconButton, Heading, IconArrowLeft, Link } from '../../components';
import { CommentContextProvider } from '../../contexts';

export type CommentTimelineWidgetProps = CommonWidgetProps & {
  commentId: string;
  comment: CommentTimelineNode;
  pageURL: string;
};

export function CommentTimelineWidget(
  props: CommentTimelineWidgetProps,
): JSX.Element {
  const [{ data }] = useCommentTimelineSubscription({
    variables: { id: props.commentId },
    pause: isSSRMode,
  });

  const comment = data?.commentByPk || props.comment;

  return (
    <WidgetLayout widgetTheme={props.theme} title="Comment timeline">
      <CommentContextProvider
        projectId={props.projectId}
        pageId={comment?.pageId || ''}
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
