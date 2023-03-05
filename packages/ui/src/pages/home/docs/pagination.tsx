import clsx from 'clsx';
import * as React from 'react';

import { Button, ButtonProps, IconArrowRight } from '../../../components';

export type PaginationLinkProps = {
  type: 'prev' | 'next';
} & Pick<
  ButtonProps,
  'disabled' | 'variant' | 'className' | 'children' | 'href' | 'onClick'
>;

export function PaginationLink({
  type,
  children,
  className,
  ...buttonProps
}: PaginationLinkProps): JSX.Element {
  return (
    <Button {...buttonProps} className={clsx('group items-center', className)}>
      {type === 'prev' && (
        <IconArrowRight
          size={20}
          className="rotate-180 transition-transform group-hover:-translate-x-1"
        />
      )}
      <span>{children}</span>
      {type === 'next' && (
        <IconArrowRight
          size={20}
          className="transition-transform group-hover:translate-x-1"
        />
      )}
    </Button>
  );
}
