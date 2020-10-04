import * as React from 'react';

type AS = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type IHeadingProps = React.ComponentProps<'h1'> & {
  as: AS;
};

const styles: Record<AS, string> = {
  h1: 'text-5xl',
  h2: 'text-4xl',
  h3: 'text-3xl',
  h4: 'text-2xl',
  h5: 'text-xl',
  h6: 'text-lg',
};

export function Heading(props: IHeadingProps): JSX.Element {
  const { as: Component, className = '', ...restProps } = props;

  return (
    <Component {...restProps} className={`text-text ${styles[Component] || ''} ${className}`} />
  );
}
