import * as React from 'react';
import 'twin.macro';

import { Heading } from '$/components/Heading';

export type PageTitleProps = React.PropsWithChildren<React.ComponentPropsWithoutRef<'div'>>;

export function PageTitle({ children, ...restProps }: PageTitleProps): JSX.Element {
  return (
    <div tw="space-y-4 w-fit" {...restProps}>
      <Heading as="h1" tw="text-4xl w-fit leading-none">
        {children}
      </Heading>
      <div tw="h-1 w-11 bg-gradient-to-r from-blue-800 to-violet-800 rounded" />
    </div>
  );
}
