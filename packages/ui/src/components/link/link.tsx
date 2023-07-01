import clsx from 'clsx';
import { motion } from 'framer-motion';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import { useHasMounted } from '../../hooks/use-has-mounted';

type Size = 'xs' | 'sm' | 'md' | 'lg';
/**
 * 'nav' means header/footer nav links
 */
type Variant = 'nav' | 'primary' | 'secondary' | 'plain';

export type LinkProps = React.PropsWithChildren<
  NextLinkProps &
    React.ComponentPropsWithoutRef<'a'> & {
      size?: Size;
      /**
       * Hightlight the link when href match the current url
       */
      highlightPattern?: RegExp;
      variant?: Variant;
      hideUnderline?: boolean;
      disabled?: boolean;
    }
>;

const sizeStyles: Record<Size, string> = {
  xs: `text-xs`,
  sm: `text-sm`,
  md: `text-base`,
  lg: `text-lg`,
};

const variantStyles: Record<Variant, string> = {
  nav: `text-gray-1200 whitespace-nowrap`,
  primary: `text-primary-1000 hover:text-primary-1200`,
  secondary: `text-gray-1100`,
  plain: ``,
};

/* eslint-disable jsx-a11y/anchor-is-valid */
export const Link = React.forwardRef(function Link(
  {
    size,
    href,
    as,
    replace,
    target: _target,
    scroll,
    shallow,
    prefetch,
    highlightPattern,
    hideUnderline,
    variant = 'nav',
    className,
    children,
    disabled,
    ...restProps
  }: LinkProps,
  ref: React.Ref<HTMLAnchorElement>,
): JSX.Element {
  if (disabled) {
    href = '';
  }
  const router = useRouter();
  const mounted = useHasMounted();
  // highlight only apply on client
  let highlight = mounted && highlightPattern?.test(router.asPath);
  if (!highlightPattern && !highlight && variant === 'nav') {
    highlight = mounted && router.asPath.startsWith(href);
  }
  const [isHovering, setIsHovering] = React.useState(false);
  const [target, setTarget] = React.useState(_target || '_self');
  React.useEffect(() => {
    if (
      !_target &&
      href.startsWith('http') &&
      !href.startsWith(window.location.origin)
    ) {
      setTarget('_blank');
    }
  }, [_target, href]);
  const commonProps = {
    target,
    ...(target === '_blank' && { rel: 'noopener noreferrer' }),
    href,
    as,
    replace,
    scroll,
    shallow,
    prefetch,
    ...restProps,
  };
  const handler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
    }
  };

  return (
    <>
      {variant === 'plain' ? (
        <NextLink
          {...commonProps}
          className={clsx(
            size && sizeStyles[size],
            disabled && disabledStyle,
            className,
          )}
          onClick={handler}
          ref={ref}
        >
          {children}
        </NextLink>
      ) : (
        <NextLink
          {...commonProps}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={handler}
          ref={ref}
          className={clsx(
            `relative !no-underline transition duration-150 ease-in-out`,
            size && sizeStyles[size],
            highlight && `font-bold`,
            variantStyles[variant],
            disabled && disabledStyle,
            className,
          )}
        >
          {children}
          {!hideUnderline && ['nav', 'secondary'].includes(variant) && (
            <span className="absolute bottom-0 left-0 -mb-1 hidden  h-0.5 w-full overflow-hidden sm:inline-block">
              <motion.span
                className="absolute inset-0 inline-block bg-current"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isHovering ? 1 : 0,
                  opacity: isHovering ? 1 : 0,
                }}
                exit={{ scale: 0, opacity: 0 }}
              />
            </span>
          )}
        </NextLink>
      )}
    </>
  );
});

const disabledStyle = `hover:cursor-default`;
