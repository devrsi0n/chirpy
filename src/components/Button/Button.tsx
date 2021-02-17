import * as React from 'react';
import clsx from 'clsx';

import { BaseButton, BaseButtonProps } from './BaseButton';

import styles from './style.module.scss';

type Size = 'sm' | 'md' | 'lg' | 'xl';
type Color = 'purple' | 'gray';
type Variant = 'solid' | 'plain' /*| 'ghost' */;

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
  onClick?: () => void;
};

const sizeStyles: Record<Size, string> = {
  sm: 'py-1 px-2 text-sm',
  md: 'py-2 px-3 text-md',
  lg: 'py-3 px-4 text-lg',
  xl: 'py-4 px-5 text-xl',
};

type VariantColor = `${Variant}-${Color}`;

type VariantColors = {
  [index in VariantColor]: string;
};

const ColorVariantStyles: VariantColors = {
  'solid-purple': `bg-purple-600 text-white border border-purple-700 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`,
  'solid-gray': `bg-gray-600 text-text-inverse border border-gray-700 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`,

  'plain-purple': `bg-white text-purple-600 border border-gray-200 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`,
  'plain-gray': `bg-white dark:bg-transparent text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`,
};

// TODO: Fix click drip animation and extract it to the base button
export const Button = React.forwardRef(function Button(
  props: ButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): JSX.Element {
  const {
    variant = 'plain',
    color = 'gray',
    disabled = false,
    size = 'md',
    className = '',
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
    if (_ref.current) {
      const rect = _ref.current.getBoundingClientRect();
      setDripShow(true);
      setDripX(event.clientX - rect.left);
      setDripY(event.clientY - rect.top);
    }
    onClick?.(event);
  };
  return (
    <>
      <BaseButton
        {...restProps}
        ref={_ref}
        className={clsx(
          'focus:outline-none',
          sizeStyles[size],
          ColorVariantStyles[`${variant}-${color}` as VariantColor],
          { 'shadow-sm': shadow, 'rounded-md': rounded },
          disabled ? 'cursor-not-allowed text-text-light bg-text-placeholder' : 'cursor-pointer',
          className,
        )}
        onClick={clickHandler}
      >
        {children}
        {dripShow && <ButtonDrip x={dripX} y={dripY} onCompleted={onDripCompleted} />}
      </BaseButton>
    </>
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
  }, [onCompleted]);

  return (
    <div
      ref={dripRef}
      className={clsx('absolute top-0 bottom-0 left-0 right-0', styles.buttonDrip)}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        style={{ top, left }}
        className="absolute w-4 h-4"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g>
            <rect width="100%" height="100%" rx="10" />
          </g>
        </g>
      </svg>
    </div>
  );
}
