import clsx from 'clsx';
import * as React from 'react';

import { BaseButton, BaseButtonProps } from './base-button';
import styles from './button.module.scss';

type Size = 'sm' | 'md' | 'lg' | 'xl';
type Color = 'primary' | 'red' | 'gray';
type Variant = 'solid' | 'default' | 'text' /*| 'ghost' */;

export type ButtonProps = BaseButtonProps & {
  variant?: Variant;
  children: React.ReactNode;
  color?: Color;
  disabled?: boolean;
  size?: Size;
  shadow?: boolean;
  /**
   * @default true
   */
  rounded?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

// TODO: extract drip animation to the base button
export const Button = React.forwardRef(function Button(
  props: ButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): JSX.Element {
  const {
    variant = 'default',
    color = 'gray',
    disabled = false,
    size = 'md',
    className,
    shadow = true,
    rounded = 'true',
    onClick,
    children,
    ...restProps
  } = props;
  const [dripShow, setDripShow] = React.useState<boolean>(false);
  const [dripX, setDripX] = React.useState<number>(0);
  const [dripY, setDripY] = React.useState<number>(0);
  const defaultRef = React.useRef<HTMLButtonElement>();
  const _ref: React.RefObject<HTMLButtonElement> = (ref ||
    defaultRef) as React.RefObject<HTMLButtonElement>;
  const onDripCompleted = React.useCallback(() => {
    setDripShow(false);
    setDripX(0);
    setDripY(0);
  }, []);
  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      return;
    }
    if (_ref.current) {
      const rect = _ref.current.getBoundingClientRect();
      setDripShow(true);
      setDripX(event.clientX - rect.left);
      setDripY(event.clientY - rect.top);
    }
    onClick?.(event);
  };
  return (
    <BaseButton
      {...restProps}
      ref={_ref}
      className={clsx(
        sizeStyles[size],
        className,
        ColorVariantStyles[`${variant}-${color}` as VariantColor],
        variant !== 'text' && shadow && `shadow-xs`,
        rounded && `rounded-md`,
      )}
      onClick={clickHandler}
      disabled={disabled}
    >
      {children}
      {dripShow && (
        <ButtonDrip x={dripX} y={dripY} onCompleted={onDripCompleted} />
      )}
    </BaseButton>
  );
});

interface ButtonDripProps {
  x: number;
  y: number;
  onCompleted: () => void;
}

function ButtonDrip({ x = 0, y = 0, onCompleted }: ButtonDripProps) {
  const dripRef = React.useRef<HTMLDivElement>(null);
  const top = Number.isNaN(+y) ? 0 : y - 10;
  const left = Number.isNaN(+x) ? 0 : x - 10;

  React.useEffect(() => {
    const element = dripRef.current;
    element?.addEventListener('animationend', onCompleted);
    return () => {
      element?.removeEventListener('animationend', onCompleted);
    };
  });

  return (
    <div ref={dripRef} className="absolute bottom-0 left-0 right-0 top-0">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        style={{ top, left }}
        className={clsx(`absolute h-4 w-4`, styles.expand)}
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g className="fill-gray-300">
            <rect width="100%" height="100%" rx="10" />
          </g>
        </g>
      </svg>
    </div>
  );
}

const sizeStyles: Record<Size, string> = {
  sm: `py-1 px-2.5 text-sm space-x-1`,
  md: `py-2 px-3 text-base`,
  lg: `py-3 px-4 text-lg`,
  xl: `py-4 px-5 text-xl`,
};

type VariantColor = `${Variant}-${Color}`;

type VariantColors = Record<VariantColor, string>;

const ColorVariantStyles: VariantColors = {
  'solid-primary': `bg-primary-900 text-whitea-1200 hover:bg-primary-1000 focus-visible:ring-primary-1000`,
  'solid-red': `bg-red-900 text-whitea-1200 hover:bg-red-1000 focus-visible:ring-red-1000`,
  'solid-gray': `bg-gray-1200 text-whitea-1200 hover:bg-gray-1100 focus-visible:ring-gray-1100`,

  'default-primary': `border border-primary-700 text-primary-900 hover:border-primary-900 hover:text-primary-1000`,
  'default-red': `border border-red-700 text-red-900 hover:border-red-900 hover:text-red-1000`,
  'default-gray': `border text-gray-1100 hover:border-gray-900 hover:text-gray-1200`,

  'text-primary': `text-primary-900 hover:bg-gray-300`,
  'text-red': `text-red-900 hover:bg-gray-300`,
  'text-gray': `text-gray-1100 hover:bg-gray-300`,
};
