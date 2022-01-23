import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

export type AS = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type IHeadingProps = React.ComponentProps<'h1'> & {
  /**
   * @default h3
   */
  as?: AS;
};

const styles: Record<AS, TwStyle> = {
  h1: tw`text-5xl tracking-tight`,
  h2: tw`text-4xl tracking-tight`,
  h3: tw`text-3xl tracking-tight`,
  h4: tw`text-2xl`,
  h5: tw`text-xl`,
  h6: tw`text-lg`,
};

export function Heading(props: IHeadingProps): JSX.Element {
  const { as: Component = 'h3', className = '', ...restProps } = props;

  return (
    <Component {...restProps} css={[tw`text-gray-1200`, styles[Component]]} className={className} />
  );
}
