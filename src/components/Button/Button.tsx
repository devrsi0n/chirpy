import { keyframes } from '@emotion/react';
import * as React from 'react';
import tw, { css, TwStyle } from 'twin.macro';

import { BaseButton, BaseButtonProps } from './BaseButton';

type Size = 'sm' | 'md' | 'lg' | 'xl';
type Color = 'purple' | 'gray';
type Variant = 'solid' | 'plain' | 'text' /*| 'ghost' */;

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

const sizeStyles: Record<Size, TwStyle> = {
  sm: tw`py-1 px-2 text-sm`,
  md: tw`py-2 px-3 text-base`,
  lg: tw`py-3 px-4 text-lg`,
  xl: tw`py-4 px-5 text-xl`,
};

type VariantColor = `${Variant}-${Color}`;

type VariantColors = {
  [index in VariantColor]: TwStyle;
};

const ColorVariantStyles: VariantColors = {
  'solid-purple': tw`bg-purple-600 text-white border border-purple-700 hover:bg-purple-700 focus:(outline-none ring-2 ring-offset-2 ring-purple-500)`,

  'solid-gray': tw`bg-gray-600 text-white border border-gray-700 hover:bg-gray-700 focus:(outline-none ring-2 ring-offset-2 ring-gray-500)`,

  'plain-purple': tw`bg-white text-purple-600 border border-gray-200 hover:bg-gray-50 focus:(ring-2 ring-offset-2 ring-purple-500)`,

  'plain-gray': tw`bg-white dark:(bg-transparent text-gray-300 border-gray-700) text-gray-600 border border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 focus:(ring-2 ring-offset-2 ring-gray-500)`,

  'text-purple': tw`text-purple-600 hover:bg-gray-50 focus:(ring-2 ring-offset-2 ring-purple-500)`,
  'text-gray': tw`text-gray-600 hover:bg-gray-50 focus:(ring-2 ring-offset-2 ring-gray-500)`,
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
        css={[
          tw`focus:outline-none`,
          sizeStyles[size],
          ColorVariantStyles[`${variant}-${color}` as VariantColor],
          variant !== 'text' && shadow && tw`shadow-sm`,
          rounded && tw`rounded-md`,
          disabled ? tw`cursor-not-allowed text-gray-300 bg-gray-50` : tw`cursor-pointer`,
        ]}
        className={className}
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
  });

  return (
    <div ref={dripRef} css={[tw`absolute top-0 bottom-0 left-0 right-0`]}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        style={{ top, left }}
        css={[
          tw`absolute w-4 h-4`,
          css`
            animation: ${expandKeyFrame} 350ms ease-in;
            animation-fill-mode: forwards;
          `,
        ]}
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g tw="fill-gray-300">
            <rect width="100%" height="100%" rx="10" />
          </g>
        </g>
      </svg>
    </div>
  );
}

const expandKeyFrame = keyframes`
  0% {
    opacity: 0;
    transform: scale(1);
  }
  30% {
    opacity: 1;
  }
  80% {
    opacity: 0.5;
  }
  100% {
    transform: scale(28);
    opacity: 0;
  }
`;
