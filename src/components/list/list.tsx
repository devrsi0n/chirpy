import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

type Variant = 'ordered' | 'unordered';
export type IListProps = React.PropsWithChildren<
  {
    /**
     * @default 'unordered'
     */
    variant?: Variant;
  } & React.ComponentProps<'ul'> &
    React.ComponentProps<'ol'>
>;

const variantTags: Record<Variant, 'ul' | 'ol'> = {
  ordered: 'ol',
  unordered: 'ul',
};

export function List({ className, variant = 'unordered', ...restProps }: IListProps): JSX.Element {
  const Tag = variantTags[variant];
  return <Tag {...restProps} className={className} css={[tw`py-2 list-none flex flex-col`]} />;
}

List.Item = ListItem;

export type IListItemProps = React.ComponentPropsWithoutRef<'li'> & {
  styles?: {
    marker?: TwStyle;
  };
  hideMarker?: boolean;
};

function ListItem({
  className,
  children,
  styles = {},
  hideMarker,
  ...liProps
}: IListItemProps): JSX.Element {
  const ChildrenContainer = typeof children === 'string' ? 'span' : React.Fragment;

  return (
    <li {...liProps} tw="text-gray-1100 flex flex-row items-center space-x-2" className={className}>
      {!hideMarker && <span css={[tw`rounded-full w-2 h-2 bg-current`, styles.marker]}></span>}

      <ChildrenContainer>{children}</ChildrenContainer>
    </li>
  );
}
