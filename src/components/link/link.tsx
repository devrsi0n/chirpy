import { m } from 'framer-motion';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

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

const sizeStyles: Record<Size, TwStyle> = {
  xs: tw`text-xs`,
  sm: tw`text-sm`,
  md: tw`text-base`,
  lg: tw`text-lg`,
};

const variantStyles: Record<Variant, TwStyle> = {
  primary: tw`text-gray-1200 whitespace-nowrap`,
  secondary: tw`text-gray-1100`,
  plain: tw``,
  solid: tw`text-blue-1100 hover:text-blue-1200`,
};

/* eslint-disable jsx-a11y/anchor-is-valid */
export function Link({
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
  children,
  disabled,
  ...restProps
}: LinkProps): JSX.Element {
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
        <a {...commonProps} css={disabled && disabledStyle} onClick={handler}>
          {children}
        </a>
      ) : (
        <a
          {...commonProps}
          css={[
            tw`relative transition duration-150 ease-in-out no-underline!`,
            size && sizeStyles[size],
            highlight && tw`font-bold`,
            variantStyles[variant],
            disabled && disabledStyle,
          ]}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={handler}
        >
          {children}
          {!hideUnderline && ['primary', 'secondary'].includes(variant) && (
            <span tw="hidden sm:(inline-block) absolute bottom-0 left-0  w-full h-0.5 -mb-1 overflow-hidden">
              <m.span
                tw="absolute inset-0 inline-block bg-current"
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

const disabledStyle = tw`hover:cursor-default`;
