import clsx from 'clsx';
import * as React from 'react';

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
  return <Tag {...restProps} className={clsx(`flex list-none flex-col py-2`, className)} />;
}

List.Item = ListItem;

export type IListItemProps = React.ComponentPropsWithoutRef<'li'> & {
  styles?: {
    marker?: string;
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
    <li
      {...liProps}
      className={clsx('flex flex-row items-center space-x-2 text-gray-1100', className)}
    >
      {!hideMarker && (
        <span className={clsx(`h-2 w-2 rounded-full bg-current`, styles.marker)}></span>
      )}

      <ChildrenContainer>{children}</ChildrenContainer>
    </li>
  );
}
