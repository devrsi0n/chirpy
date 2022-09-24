import { useTheme } from 'next-themes';
import Script from 'next/script';
import * as React from 'react';

import { ClientOnly } from '$/components/client-only';
import { getPublicEnvVar } from '$/utilities/isomorphic/env';

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
        data-chirpy-domain={getPublicEnvVar(
          'NEXT_PUBLIC_COMMENT_DOMAIN',
          process.env.NEXT_PUBLIC_COMMENT_DOMAIN,
        )}
      />
    </ClientOnly>
  );
}
