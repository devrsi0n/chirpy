import { getAppURL } from '@chirpy-dev/utils';
import { useTheme } from 'next-themes';
import Script from 'next/script';
import * as React from 'react';

import { ClientOnly } from '../../components/client-only';

export function CommentWidget(): JSX.Element {
  const { resolvedTheme } = useTheme();
  return (
    <ClientOnly>
      <div
        data-chirpy-comment
        data-chirpy-theme={resolvedTheme || 'system'}
        className="my-16"
        id="chirpy-comment"
      />
      <Script
        src="/bootstrapper.js"
        strategy="beforeInteractive"
        data-chirpy-domain={new URL(getAppURL()).hostname}
      />
    </ClientOnly>
  );
}
