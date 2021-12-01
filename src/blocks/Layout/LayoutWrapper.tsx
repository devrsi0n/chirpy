import * as React from 'react';
import tw from 'twin.macro';

export type LayoutWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export function LayoutWrapper({ children, className }: LayoutWrapperProps): JSX.Element {
  return (
    <div css={[tw`min-h-full font-sans text-gray-1000`]} className={className}>
      {children}
    </div>
  );
}
