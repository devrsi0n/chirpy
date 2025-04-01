import Head from 'next/head';
import * as React from 'react';
import type { Thing, WithContext } from 'schema-dts';

// Export specific schema types if needed, re-exporting from schema-dts
export type { Comment, DiscussionForumPosting } from 'schema-dts';

export type JSONLDProps<T extends Thing> = {
  data: WithContext<T>;
};

/**
 * Adds structured data for SEO using JSON-LD
 * Generic type T extends Thing from schema-dts for strong typing
 */
export function JSONLD<T extends Thing>({ data }: JSONLDProps<T>): JSX.Element {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Head>
  );
}
