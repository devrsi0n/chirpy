import clsx from 'clsx';
import * as React from 'react';

import { BaseButton, BaseButtonProps } from './base-button';
import styles from './button.module.scss';

type Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type Variant = 'primary' | 'secondary' | 'text';

export type ButtonProps = BaseButtonProps & {
  /**
   * @default 'secondary'
   */
  variant?: Variant;
  children: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  /**
   * @default 'md'
   */
  size?: Size;
  /**
   * @default true
   */
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
    variant = 'secondary',
    disabled = false,
    danger = false,
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
        className,
        'transition duration-150 ease-in-out',
        'focus-visible:ring-3 font-semibold focus:outline-none focus-visible:ring-opacity-50',
        'h-fit',
        sizeStyles[size],
        danger ? VariantDangerStyles[variant] : VariantStyles[variant],
        danger && 'focus-visible:ring-red-700',
        variant !== 'text' && shadow && `shadow-sm`,
        rounded && `rounded-lg`,
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
    <div ref={dripRef} className="absolute top-0 bottom-0 left-0 right-0">
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
  sm: `px-3.5 py-2 text-sm`,
  md: `px-4 py-2.5 text-sm`,
  lg: `px-4 py-2.5 text-base`,
  xl: `px-5 py-3 text-base`,
  '2xl': `px-7 py-4 text-lg`,
};

const VariantStyles: Record<Variant, string> = {
  primary:
    'bg-primary-900 text-whitea-1200 enabled:hover:bg-primary-1000 focus-visible:ring-primary-1000',
  secondary:
    'bg-gray-100 border border-gray-700 text-gray-1200 enabled:hover:border-gray-800 enabled:hover:bg-gray-300 focus-visible:ring-gray-700',
  text: 'text-primary-1100 enabled:hover:text-primary-1200 focus-visible:ring-primary-1000',
};

const VariantDangerStyles: Record<Variant, string> = {
  primary: 'bg-red-900 text-whitea-1200 enabled:hover:bg-red-1000',
  secondary:
    'bg-gray-100 text-red-900 border border-red-700 enabled:hover:border-red-800 enabled:hover:bg-red-300 enabled:hover:text-red-1000',
  text: 'text-red-900 enabled:hover:bg-red-300',
};
