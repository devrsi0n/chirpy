import clsx from 'clsx';
import * as React from 'react';

export type AS = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type IHeadingProps = React.ComponentProps<'h1'> & {
  /**
   * @default h3
   */
  as?: AS;
};

const styles: Record<AS, string> = {
  h1: `text-5xl tracking-tight`,
  h2: `text-4xl tracking-tight`,
  h3: `text-3xl tracking-tight`,
  h4: `text-2xl`,
  h5: `text-xl`,
  h6: `text-lg`,
};

export function Heading(props: IHeadingProps): JSX.Element {
  const { as: Component = 'h3', className, ...restProps } = props;

  return (
    <Component
      {...restProps}
      className={clsx(`text-gray-1200`, styles[Component], className)}
    />
  );
}
