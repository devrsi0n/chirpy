import { ExtendedRecordMap } from '@chirpy-dev/trpc/src/ui';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { NotionRenderer } from 'react-notion-x';

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code),
);
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection,
  ),
);
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation),
);
const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false,
  },
);
const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false,
  },
);
export type NotionBlocksProps = {
  recordMap: ExtendedRecordMap;
};

export function NotionBlocks(props: NotionBlocksProps): JSX.Element {
  return (
    <NotionRenderer
      recordMap={props.recordMap as unknown as ExtendedRecordMap}
      fullPage
      darkMode={false}
      components={{
        Code,
        Collection,
        Equation,
        Modal,
        Pdf,
      }}
    />
  );
}
