import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import { useHasMounted } from '../../../../hooks';
import { listHoverableColor } from '../../../../styles/common';

export type NavLinkProps = {
  children: React.ReactNode;
  href: string;
  icon: React.ReactNode;
  highlightPattern?: RegExp;
};

export function NavLink(props: NavLinkProps): JSX.Element {
  const router = useRouter();
  const mounted = useHasMounted();
  // highlight only apply on client
  const highlight = mounted && props.highlightPattern?.test(router.asPath);
  return (
    <Link
      href={props.href}
      className={clsx(
        'flex flex-row items-center space-x-3 rounded py-2 px-3 text-gray-1200',
        listHoverableColor,
        highlight && 'bg-gray-300',
      )}
    >
      {props.icon}
      <span className="text-base font-semibold leading-none">
        {props.children}
      </span>
    </Link>
  );
}
