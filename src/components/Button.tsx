/** @jsx jsx */
import { jsx } from 'theme-ui';
import * as React from 'react';

type Size = 'sm' | 'md' | 'lg' | 'xl';
type Variant = 'primary' | 'secondary';

export interface IButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  variant?: Variant;
  disabled?: boolean;
  size?: Size;
}

const sizeStyles: Record<Size, string> = {
  sm: 'p-1 text-sm',
  md: 'p-2 text-md',
  lg: 'p-3 text-lg',
  xl: 'p-4 text-xl',
};

const variantStyles: Record<Variant, string> = {
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-white',
};

export function Button(props: IButtonProps): JSX.Element {
  const { variant = 'primary', disabled = false, size = 'md', children } = props;
  return (
    <button
      className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${sizeStyles[size]} ${
        variantStyles[variant]
      }`}
    >
      {children}
    </button>
  );
}
