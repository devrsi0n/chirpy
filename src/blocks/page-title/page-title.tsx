import clsx from 'clsx';
import * as React from 'react';

import { Heading } from '$/components/heading';
import { gradient } from '$/styles/common';

export type PageTitleProps = React.PropsWithChildren<React.ComponentPropsWithoutRef<'div'>>;

export function PageTitle({ children, className, ...restProps }: PageTitleProps): JSX.Element {
  return (
    <div className={clsx('space-y-4 w-fit', className)} {...restProps}>
      <Heading as="h1" className="text-4xl w-fit leading-none font-bold">
        {children}
      </Heading>
      <div className={clsx('h-1 w-11 rounded', gradient)} />
    </div>
  );
}
