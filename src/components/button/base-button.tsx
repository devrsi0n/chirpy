import { useButton } from '@react-aria/button';
import { AriaButtonProps } from '@react-types/button';
import * as React from 'react';
import tw from 'twin.macro';

export type BaseButtonProps = AriaButtonProps &
  Omit<React.ComponentPropsWithRef<'button'>, keyof AriaButtonProps>;

const BaseButton = React.forwardRef(function BaseButton(
  { type = 'button', children, className, onClick, onMouseDown, ...restProps }: BaseButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): JSX.Element {
  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      // Prevent mouse click with focus styles(e.g. outline)
      e.preventDefault();
      onMouseDown?.(e);
    },
    [onMouseDown],
  );
  const defaultRef = React.useRef<HTMLButtonElement>();
  const _ref: React.RefObject<HTMLButtonElement> = (ref ||
    defaultRef) as React.RefObject<HTMLButtonElement>;
  const props = {
    type,
    ...restProps,
  };
  const { buttonProps } = useButton(props, _ref);
  const allProps = {
    ...buttonProps,
    ...restProps,
  };

  return (
    <button
      {...allProps}
      className={className}
      tw="focus-visible:(ring-2 ring-offset-2 ring-offset-bg ring-current) disabled:(opacity-75 cursor-not-allowed) transition"
      css={[
        tw`relative overflow-hidden inline-flex flex-row justify-center items-center select-none transition duration-150 ease-in-out`,
      ]}
      onMouseDown={handleMouseDown}
      onClick={onClick}
      ref={_ref}
    >
      {children}
    </button>
  );
});

export { BaseButton };
