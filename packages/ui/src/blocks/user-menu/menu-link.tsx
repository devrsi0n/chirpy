import clsx from 'clsx';
import React from 'react';

import { Link, LinkProps } from '../../components/link';

export const MenuLink = React.forwardRef(function MenuLink(
  { className, ...restProps }: LinkProps,
  ref: React.Ref<HTMLAnchorElement>,
): JSX.Element {
  return (
    <Link ref={ref} {...restProps} className={clsx(itemStyle, className)} />
  );
});

export const itemStyle = 'flex flex-row gap-2 items-center';
