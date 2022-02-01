import * as React from 'react';
import 'twin.macro';

type PropsOf<E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
  JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>;

export interface BoxOwnProps<E extends React.ElementType = React.ElementType> {
  as?: E;
}

export type BoxProps<E extends React.ElementType = React.ElementType> = BoxOwnProps<E> &
  Omit<PropsOf<E>, keyof BoxOwnProps>;

export type PolymorphicComponentProps<E extends React.ElementType, P> = P & BoxProps<E>;

const defaultElement = 'div';

/**
 * A generic box component with a `as` prop.
 */
export const Box = React.forwardRef(function Box(
  { as, ...restProps }: BoxOwnProps,
  ref: React.Ref<Element>,
) {
  const Element = as || defaultElement;
  return <Element ref={ref} {...restProps} />;
}) as <E extends React.ElementType = typeof defaultElement>(props: BoxProps<E>) => JSX.Element;
