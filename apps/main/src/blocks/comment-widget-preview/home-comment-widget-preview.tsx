import * as React from 'react';

import { Arrow } from '$/components/icons';

import { CommentWidgetPreview } from './comment-widget-preview';

// export type HomeCommentWidgetPreviewProps = {
//   children: React.ReactNode;

// };

export function HomeCommentWidgetPreview(): JSX.Element {
  return (
    <div className="w-full">
      <div className="flex translate-y-6 flex-col items-center text-gray-1100">
        <p className="mb-2 translate-x-10 text-2xl tracking-wider">Try it out!</p>
        <Arrow />
      </div>
      <div className="w-full rounded-lg border border-gray-400 p-4">
        <CommentWidgetPreview
          hideCommentTimeline
          rtePlaceholder="Comment widget (Markdown shortcuts supported)"
        />
      </div>
    </div>
  );
}
