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
  h1: `text-display-lg`,
  h2: `text-display-md`,
  h3: `text-display-sm`,
  h4: `text-display-xs`,
  h5: `text-xl`,
  h6: `text-lg`,
};

export function Heading(props: IHeadingProps): JSX.Element {
  const { as: Component = 'h3', className, children, ...restProps } = props;

  return (
    <Component
      {...restProps}
      className={clsx(className, `text-gray-1200`, styles[Component])}
    >
      {children}
    </Component>
  );
}
