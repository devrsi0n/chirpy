import * as React from 'react';

import { IconArrow } from '../../components';
import {
  CommentWidgetPreview,
  CommentWidgetPreviewProps,
} from './comment-widget-preview';

export type HomeCommentWidgetPreviewProps = Pick<
  CommentWidgetPreviewProps,
  'buildDate'
>;

export function HomeCommentWidgetPreview({
  buildDate,
}: HomeCommentWidgetPreviewProps): JSX.Element {
  return (
    <div className="w-full">
      <div className="flex translate-y-6 flex-col items-center text-gray-1100">
        <p className="mb-2 translate-x-10 text-2xl tracking-wider">
          Try it out!
        </p>
        <IconArrow />
      </div>
      <div className="w-full rounded-lg border border-gray-300 bg-gray-0 p-4">
        <CommentWidgetPreview
          rtePlaceholder="Comment widget (Markdown supported)"
          buildDate={buildDate}
        />
      </div>
    </div>
  );
}
