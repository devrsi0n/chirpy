import * as React from 'react';
import 'twin.macro';

import { Heading } from '$/components/Heading';

export type PageTitleProps = React.PropsWithChildren<React.ComponentPropsWithoutRef<'div'>>;

export function PageTitle({ children, ...restProps }: PageTitleProps): JSX.Element {
  return (
    <div tw="space-y-4 w-fit" {...restProps}>
      <Heading as="h1" tw="text-4xl text-gray-600 w-fit leading-none">
        {children}
      </Heading>
      <div tw="h-1 w-1/3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded" />
    </div>
  );
}
