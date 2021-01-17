import * as React from 'react';
import clsx from 'clsx';

import { BaseButton, BaseButtonProps } from './BaseButton';

import styles from './style.module.scss';

type Size = 'sm' | 'md' | 'lg' | 'xl';
type Color = 'purple' | 'gray';
type Variant = 'solid' | 'plain' /*| 'ghost' */;

export type IButtonProps = BaseButtonProps & {
  /**
   * @default solid
   */
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

// const colorStyles: Record<Color, string> = {
//   primary:
//     'bg-primary text-text-inverse border border-primary hover:bg-transparent hover:text-primary',
//   secondary: 'bg-background-secondary text-text-secondary border hover:text-text hover:bg-gray-200',
//   // text: 'text-text border-none hover:text-text-light',
// };

const getVariantStyles = (variant: Variant, color: Color): string =>
  ({
    solid: `bg-${color}-600 text-text-inverse border border-${color}-700 hover:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500`,
    plain: `bg-white text-${color}-600 border border-gray-200 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500`,
  }[variant]);

// TODO: Fix click drip animation and extract it to the base button
export function Button(props: IButtonProps): JSX.Element {
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
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [dripShow, setDripShow] = React.useState<boolean>(false);
  const [dripX, setDripX] = React.useState<number>(0);
  const [dripY, setDripY] = React.useState<number>(0);
  const onDripCompleted = React.useCallback(() => {
    setDripShow(false);
    setDripX(0);
    setDripY(0);
    onClick?.();
  }, [onClick]);
  const clickHandler = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDripShow(true);
      setDripX(event.clientX - rect.left);
      setDripY(event.clientY - rect.top);
    }
  }, []);
  return (
    <>
      <BaseButton
        {...restProps}
        ref={buttonRef}
        className={clsx(
          'focus:outline-none',
          sizeStyles[size],
          getVariantStyles(variant, color),
          { 'shadow-sm': shadow, 'rounded-md': rounded },
          disabled ? 'cursor-not-allowed text-text-light bg-text-placeholder' : 'cursor-pointer',
          className,
        )}
        onClick={clickHandler}
      >
        <span className="">{children}</span>
        {dripShow && <ButtonDrip x={dripX} y={dripY} onCompleted={onDripCompleted} />}
      </BaseButton>
    </>
  );
}

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
