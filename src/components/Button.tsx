import * as React from 'react';

type Size = 'sm' | 'md' | 'lg' | 'xl';
type Variant = 'primary' | 'secondary' | 'text';

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
  primary: 'bg-primary text-white border border-primary hover:bg-white hover:text-primary',
  secondary: 'bg-secondary text-white',
  text: 'text-gray-600 border-none hover:text-gray-900',
};

export function Button(props: IButtonProps): JSX.Element {
  const {
    variant = 'primary',
    disabled = false,
    size = 'md',
    children,
    className = '',
    ...restProps
  } = props;
  return (
    <button
      {...restProps}
      className={`inline-flex flex-row justify-center items-center rounded select-none outline-none transition duration-150 ease-in-out ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      } ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
