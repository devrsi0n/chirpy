import * as React from 'react';
import 'twin.macro';

import { Heading } from '$/components/Heading';

export type PageTitleProps = React.PropsWithChildren<React.ComponentPropsWithoutRef<'div'>>;

export function PageTitle({ children, ...restProps }: PageTitleProps): JSX.Element {
  return (
    <div tw="space-y-3 w-fit" {...restProps}>
      <Heading as="h2" tw="text-3xl text-gray-600 font-semibold w-fit">
        {children}
      </Heading>
      <div tw="h-1 w-1/3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded" />
      {/* <div tw="h-1 bg-black" /> */}
    </div>
  );
}
