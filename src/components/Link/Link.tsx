import { m } from 'framer-motion';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

type Size = 'xs' | 'sm' | 'md' | 'lg';
type Variant = 'nav' | 'plain' | 'solid';

export type LinkProps = React.PropsWithChildren<
  NextLinkProps &
    React.ComponentPropsWithoutRef<'a'> & {
      size?: Size;
      /**
       * Hightlight the link when href match the current url
       */
      highlightMatch?: boolean;
      variant?: Variant;
      noUnderline?: boolean;
    }
>;

const sizeStyles: Record<Size, TwStyle> = {
  xs: tw`text-xs font-semibold`,
  sm: tw`text-sm font-semibold`,
  md: tw`text-base font-semibold`,
  lg: tw`text-lg font-semibold`,
};

const variantStyles: Record<Variant, TwStyle> = {
  nav: tw`text-gray-700 hover:text-black dark:text-gray-200 dark:hover:text-gray-100`,
  plain: tw``,
  solid: tw`text-blue-500! hover:text-blue-800! dark:text-blue-200! dark:hover:text-blue-100!`,
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
    noUnderline: disableUnderline,
    variant = 'nav',
    children,
    ...restProps
  } = props;
  const router = useRouter();
  const isCurrentURL = highlightMatch && router.pathname === href;
  const [isHovering, setIsHovering] = React.useState(false);
  const [target, setTarget] = React.useState(props.target || '_self');
  React.useEffect(() => {
    if (!props.target && href.startsWith('http') && !href.startsWith(window.location.origin)) {
      setTarget('_blank');
    }
  }, [props.target, href]);

  return (
    <NextLink {...{ href, as, replace, scroll, shallow, passHref, prefetch }}>
      {variant === 'plain' ? (
        <a {...restProps} className={className}>
          {children}
        </a>
      ) : (
        <a
          {...restProps}
          css={[
            tw`relative transition duration-150 ease-in-out no-underline! whitespace-nowrap`,
            size && sizeStyles[size],
            isCurrentURL && tw`font-bold`,
            variantStyles[variant],
          ]}
          className={className}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          target={target}
        >
          <span>{children}</span>

          {!disableUnderline && variant === 'nav' && (
            <span tw="absolute bottom-0 left-0 inline-block w-full h-0.5 -mb-1 overflow-hidden">
              <m.span
                tw="absolute inset-0 inline-block bg-gray-900 dark:bg-gray-300"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: isHovering ? 1 : 0, opacity: isHovering ? 1 : 0 }}
                exit={{ scale: 0, opacity: 0 }}
              />
            </span>
          )}
        </a>
      )}
    </NextLink>
  );
}
