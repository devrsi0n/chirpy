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
  h1: `text-7xl`,
  h2: `text-6xl`,
  h3: `text-5xl`,
  h4: `text-4xl`,
  h5: `text-3xl`,
  h6: `text-2xl`,
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
