import * as React from 'react';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Transition } from '@headlessui/react';

type Size = 'xs' | 'sm' | 'md' | 'lg';
type Variant = 'nav' | 'plain';

type LinkProps = React.PropsWithChildren<
  NextLinkProps &
    React.ComponentPropsWithoutRef<'a'> & {
      size?: Size;
      /**
       * Hightlight the link when href match the current url
       */
      highlightMatch?: boolean;
      variant?: Variant;
      disableUnderline?: boolean;
    }
>;

const sizeStyles: Record<Size, string> = {
  xs: 'text-xs font-semibold',
  sm: 'text-sm font-semibold',
  md: 'text-md font-semibold',
  lg: 'text-lg font-semibold',
};

/* eslint-disable jsx-a11y/anchor-is-valid */
export function Link(props: LinkProps): JSX.Element {
  const {
    size,
    href,
    as,
    replace,
    scroll,
    shallow,
    passHref = true,
    prefetch,
    className = '',
    highlightMatch,
    disableUnderline,
    variant = 'nav',
    children,
    ...restProps
  } = props;
  const router = useRouter();
  const isCurrentURL = highlightMatch && router.pathname === href;
  const [isHovering, setIsHovering] = React.useState(false);
  return (
    <NextLink {...{ href, as, replace, scroll, shallow, passHref, prefetch }}>
      {variant === 'plain' ? (
        <a {...restProps} className={className}>
          {children}
        </a>
      ) : (
        <a
          {...restProps}
          className={clsx(
            `relative transition duration-150 ease-in-out`,
            size && sizeStyles[size],
            isCurrentURL ? 'text-primary-dark' : 'text-gray-600 hover:text-gray-900',
            className,
          )}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span>{children}</span>
          {!disableUnderline && (
            <span className="absolute bottom-0 left-0 inline-block w-full h-0.5 -mb-1 overflow-hidden">
              <Transition
                as="span"
                className="absolute inset-0 inline-block w-full h-1 transform bg-gray-900"
                show={isHovering}
                enter="transition ease duration-200"
                enterFrom="scale-0"
                enterTo="scale-100"
                leave="transition ease-out duration-300"
                leaveFrom="scale-100"
                leaveTo="scale-0"
              />
            </span>
          )}
        </a>
      )}
    </NextLink>
  );
}
