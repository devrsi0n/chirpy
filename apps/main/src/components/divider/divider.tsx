import clsx from 'clsx';
import * as React from 'react';

import { Text } from '$/components/text';

import { Heading } from '../heading';
import styles from './divider.module.scss';

export type DividerVariant = 'text' | 'heading';
export type DividerProps = React.ComponentPropsWithoutRef<'div'> & {
  vertical?: boolean;
  variant?: DividerVariant;
};

const WrapperMap: Record<DividerVariant, React.FC> = {
  text: DividerText,
  heading: DividerHeading,
};

export function Divider({
  vertical,
  className,
  variant,
  children,
  ...divProps
}: DividerProps): JSX.Element {
  const _className = vertical
    ? clsx('w-[1px]', 'bg-gray-500')
    : clsx(`relative w-auto max-w-full`, styles.divider);
  if (!children) {
    return (
      <div
        role="separator"
        {...divProps}
        className={clsx(_className, className)}
      />
    );
  }
  if (!variant) {
    return (
      <div
        role="separator"
        {...divProps}
        className={clsx(_className, className)}
      >
        {children}
      </div>
    );
  }
  const Wrapper = variant ? WrapperMap[variant] : React.Fragment;
  const rootClassName = clsx('flex flex-row items-center', className);
  const lineClassName = clsx(_className, '!w-full');
  return (
    <div role="separator" className={rootClassName} {...divProps}>
      <div className={lineClassName} />
      <Wrapper>{children}</Wrapper>
      <div className={lineClassName} />
    </div>
  );
}

function DividerText({ children }: { children?: React.ReactNode }) {
  return (
    <Text as="span" variant="secondary" className="px-2" size="sm">
      {children}
    </Text>
  );
}

function DividerHeading({ children }: { children?: React.ReactNode }) {
  return <Heading className="px-2">{children}</Heading>;
}
