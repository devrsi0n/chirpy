import clsx from 'clsx';
import * as React from 'react';

import { IconChevronRight, Link } from '../../../components';
import { listHoverable } from '../../../styles/common';

export type PaginationLinkProps = {
  children: React.ReactNode;
  href: string;
  type: 'prev' | 'next';
  className?: string;
};

export function PaginationLink(props: PaginationLinkProps): JSX.Element {
  return (
    <Link
      size="lg"
      variant="plain"
      href={props.href}
      className={clsx(
        'flex flex-row items-center px-3 py-2 text-gray-1200',
        listHoverable,
        props.className,
      )}
    >
      {props.type === 'prev' && (
        <IconChevronRight size={28} className="rotate-180" />
      )}
      <span>{props.children}</span>
      {props.type === 'next' && <IconChevronRight size={28} />}
    </Link>
  );
}
