import { IconArrow } from '@chirpy-dev/ui';
import * as React from 'react';

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
      <div className="w-full rounded-lg border border-gray-300 bg-gray-100 p-4 dark:bg-gray-300">
        <CommentWidgetPreview
          rtePlaceholder="Comment widget"
          buildDate={buildDate}
        />
      </div>
    </div>
  );
}
