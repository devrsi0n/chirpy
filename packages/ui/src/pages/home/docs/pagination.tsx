import * as React from 'react';

import { Button, IconChevronRight } from '../../../components';

export type PaginationLinkProps = {
  children: React.ReactNode;
  href: string;
  type: 'prev' | 'next';
  className?: string;
};

export function PaginationLink(props: PaginationLinkProps): JSX.Element {
  return (
    <Button href={props.href} className="items-center">
      {props.type === 'prev' && <IconChevronRight size={20} />}
      <span>{props.children}</span>
      {props.type === 'next' && <IconChevronRight size={20} />}
    </Button>
  );
}
