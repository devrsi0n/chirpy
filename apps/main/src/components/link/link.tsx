import clsx from 'clsx';
import { m } from 'framer-motion';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

type Size = 'xs' | 'sm' | 'md' | 'lg';
type Variant = 'primary' | 'secondary' | 'plain' | 'solid';

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
  primary: `text-gray-1200 whitespace-nowrap`,
  secondary: `text-gray-1100`,
  plain: ``,
  solid: `text-blue-1100 hover:text-blue-1200`,
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
    passHref = true,
    prefetch,
    highlightPattern,
    hideUnderline,
    variant = 'primary',
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
  const highlight = highlightPattern && highlightPattern.test(router.asPath);
  const [isHovering, setIsHovering] = React.useState(false);
  const [target, setTarget] = React.useState(_target || '_self');
  React.useEffect(() => {
    if (!_target && href.startsWith('http') && !href.startsWith(window.location.origin)) {
      setTarget('_blank');
    }
  }, [_target, href]);
  const commonProps = {
    target,
    ...(target === '_blank' && { rel: 'noopener noreferrer' }),
    ...restProps,
  };
  const handler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
    }
  };

  return (
    <NextLink {...{ href, as, replace, scroll, shallow, passHref, prefetch }}>
      {variant === 'plain' ? (
        <a
          {...commonProps}
          className={clsx(disabled && disabledStyle, className)}
          onClick={handler}
          ref={ref}
        >
          {children}
        </a>
      ) : (
        <a
          {...commonProps}
          className={clsx(
            `relative !no-underline transition duration-150 ease-in-out`,
            size && sizeStyles[size],
            highlight && `font-bold`,
            variantStyles[variant],
            disabled && disabledStyle,
            className,
          )}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={handler}
          ref={ref}
        >
          {children}
          {!hideUnderline && ['primary', 'secondary', 'solid'].includes(variant) && (
            <span className="absolute bottom-0 left-0 -mb-1 hidden  h-0.5 w-full overflow-hidden sm:inline-block">
              <m.span
                className="absolute inset-0 inline-block bg-current"
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
});

const disabledStyle = `hover:cursor-default`;
