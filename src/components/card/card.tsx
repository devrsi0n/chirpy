import * as React from 'react';
import tw from 'twin.macro';

import { cardBg } from '$/styles/common';

type PropsOf<E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
  JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>;

export interface BoxOwnProps<E extends React.ElementType = React.ElementType> {
  as?: E;
}

export type BoxProps<E extends React.ElementType> = BoxOwnProps<E> &
  Omit<PropsOf<E>, keyof BoxOwnProps>;

export type PolymorphicComponentProps<E extends React.ElementType, P> = P & BoxProps<E>;

const defaultElement = 'div';

export const Box = React.forwardRef(function Box(
  { as, ...restProps }: BoxOwnProps,
  ref: React.Ref<Element>,
) {
  const Element = as || defaultElement;
  return <Element ref={ref} {...restProps} />;
}) as <E extends React.ElementType = typeof defaultElement>(props: BoxProps<E>) => JSX.Element;

type CustomComponentOwnProps = {
  /**
   * @default true
   */
  shadow?: boolean;
};

export type CustomComponentProps<E extends React.ElementType> = PolymorphicComponentProps<
  E,
  CustomComponentOwnProps
>;

export function Card<E extends React.ElementType>({
  shadow = true,
  ...restProps
}: CustomComponentProps<E>): JSX.Element {
  return (
    <Box
      css={[cardBg, tw`rounded border border-gray-400`, shadow && tw`shadow-sm hover:shadow-xl`]}
      {...restProps}
    />
  );
}
