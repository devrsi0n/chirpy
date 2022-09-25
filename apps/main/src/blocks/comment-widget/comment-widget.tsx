import { useTheme } from 'next-themes';
import Script from 'next/script';
import * as React from 'react';

import { ClientOnly } from '$/components/client-only';
import { APP_URL } from '$/lib/constants';

export function CommentWidget(): JSX.Element {
  const { resolvedTheme } = useTheme();
  return (
    <ClientOnly>
      <div
        data-chirpy-comment
        data-chirpy-theme={resolvedTheme || 'system'}
        className="my-16"
      />
      <Script
        src="/bootstrap/comment.js"
        strategy={'afterInteractive'}
        data-chirpy-domain={new URL(APP_URL).hostname}
      />
    </ClientOnly>
  );
}
