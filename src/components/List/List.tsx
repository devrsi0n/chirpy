import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

type Variant = 'ordered' | 'unordered';
export type IListProps = React.PropsWithChildren<
  {
    variant: Variant;
  } & React.ComponentProps<'ul'> &
    React.ComponentProps<'ol'>
>;

const variantTags: Record<Variant, 'ul' | 'ol'> = {
  ordered: 'ol',
  unordered: 'ul',
};

const variantStyles: Record<Variant, TwStyle> = {
  ordered: tw`list-decimal`,
  unordered: tw`list-disc`,
};

export function List({ className, variant, ...restProps }: IListProps): JSX.Element {
  const Tag = variantTags[variant];
  return (
    <Tag
      {...restProps}
      className={className}
      css={[tw`py-2 list-inside`, variantStyles[variant]]}
    />
  );
}

List.Item = ListItem;

export type IListItemProps = React.PropsWithChildren<React.ComponentPropsWithoutRef<'li'>>;

function ListItem({ className, children, ...liProps }: IListItemProps): JSX.Element {
  return (
    <li {...liProps} tw="text-gray-500" className={className}>
      {children}
    </li>
  );
}
